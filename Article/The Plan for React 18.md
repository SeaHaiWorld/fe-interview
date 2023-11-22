# The Plan for React 18

原文戳[这里](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html)

#### React18将会带来什么

- 循序渐进的采用策略

- 开箱即用的优化
  - [automatic batching](https://github.com/reactwg/react-18/discussions/21)
- 新的api
  - [startTransition](https://github.com/reactwg/react-18/discussions/41)
- [new streaming server renderer](https://github.com/reactwg/react-18/discussions/37)
  - React.lazy

#### 循序渐进的采用策略

升级到 18 几乎不需要任何改动。

> 由于 React 18 中的并发是可选的，因此组件行为没有重大的开箱即用的重大更改。**您可以升级到 React 18，对您的应用程序代码进行最少的更改或不更改，其工作水平与典型的主要 React 版本相当**。根据我们将多个应用程序转换为 React 18 的经验，我们预计许多用户将能够在一个下午内升级。
>
> 我们成功地为 Facebook 的数以万计组件提供了并发功能，根据我们的经验，我们发现大多数 React 组件“正常工作”，无需额外更改。我们致力于确保这是整个社区的顺利升级，因此今天我们宣布成立 React 18 工作组。

同时react还专门成立了一个工作组来向整个社区公开有关 18 的讨论与进度。

#### Automatic batching

##### batching是什么

- React**将多个状态更新合并到单个状态更新中**以获得更好的性能。

  ```javascript
  function App() {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);
  
    function handleClick() {
      setCount(c => c + 1); // Does not re-render yet
      setFlag(f => !f); // Does not re-render yet
      // React will only re-render once at the end (that's batching!)
    }
  
    return (
      <div>
        <button onClick={handleClick}>Next</button>
        <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
      </div>
    );
  }
  ```

优化了react的性能，因为这种做法避免了不必要的重新渲染。

还可以防止组件呈现仅更新一个状态变量的“半完成”状态，这可能会导致错误。

但react本身不确保总是会发生batching，我们来看下面这个例子。

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    fetchSomething().then(() => {
      // React 17 and earlier does NOT batch these because
      // they run *after* the event in a callback, not *during* it
      setCount(c => c + 1); // Causes a re-render
      setFlag(f => !f); // Causes a re-render
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

直到react18之前，react都只针对react事件处理函数内的更新进行batching，如果这些更新发生在像promises，setTimeout，原生的事件处理函数或者是其他事件的话是不会被batching的。这就引入了一个想法，对所有的更新都进行batching，这就叫automatic batching。

##### Automatic batching

react18开始之后，使用createRoot，react就会把更新都进行batching，无论这些更新在哪里被触发。这样带来的好处就是，react18会有执行更少的渲染工作，以达到更好的性能。

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    fetchSomething().then(() => {
      // React 18 and later DOES batch these:
      setCount(c => c + 1);
      setFlag(f => !f);
      // React will only re-render once at the end (that's batching!)
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

意味着以下几种写法是一致的。

```javascript
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}
```

```javascript
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);
```

```javascript
fetch(/*...*/).then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
})
```

```javascript
elm.addEventListener('click', () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
});
```

Automatic batching意味着automatic，但如果存在不需要自动batching的场景，可以使用`ReactDOM.flushSync()`来对更新进行处理。(但官方不推荐经常这么使用，可能是因为性能的原因)

```javascript
import { flushSync } from 'react-dom'; // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag(f => !f);
  });
  // React has updated the DOM by now
}
```

##### 对类组件的影响

在之前的版本，我们可以通过把setState放到事件比如说setTimeout里来达到让setState“同步”更新，我们能同步读取最新的state。

```javascript
handleClick = () => {
  setTimeout(() => {
    this.setState(({ count }) => ({ count: count + 1 }));

    // { count: 1, flag: false }
    console.log(this.state);

    this.setState(({ flag }) => ({ flag: !flag }));
  });
};
```

但是在react18，由于automatic batching，react会自动将所有的更新处理都batching，这导致了上面的情况不能再”同步“地获取到state的值，就会导致下面的问题。

```JavaScript
handleClick = () => {
  setTimeout(() => {
    this.setState(({ count }) => ({ count: count + 1 }));

    // { count: 0, flag: false }
    console.log(this.state);

    this.setState(({ flag }) => ({ flag: !flag }));
  });
};
```

所以可以通过`ReactDOM.flushSync()`来解决。

```javascript
handleClick = () => {
  setTimeout(() => {
    ReactDOM.flushSync(() => {
      this.setState(({ count }) => ({ count: count + 1 }));
    });

    // { count: 1, flag: false }
    console.log(this.state);

    this.setState(({ flag }) => ({ flag: !flag }));
  });
};
```

#### startTransition

我们先来看一个例子，假设现在有一个input输入框，它是用来过滤、搜索一个列表数据的。像这样。

<img src="/Users/zaihui/Library/Application Support/typora-user-images/image-20210630103100548.png" alt="image-20210630103100548" style="zoom:50%;" />

我们需要将输入框里的值和搜索结果都保存下来，并实时更新到组件中。代码如下。

```javascript
// Update the input value and search results
setSearchQuery(input);
```

这种情况下，用户每输入一个字符，就会触发输入框内的值的更新，并且需要使用新的值来对内容进行搜索处理，如果需要更新的元素很多，就很容易会造成页面显示的卡顿。即使渲染的列表不是很长，但因为列表项元素本身的复杂程度，还有每次渲染造成的key的不同，所以很难对渲染进行优化。

分析下上面的情况，其实是有两部分的操作，首先需要更新输入框内的值（可能还有一些相关的UI更新），其次是将搜索结果给展示出来。很明显的是，更新输入框的值是“紧急”的更新，而搜索结果的展示则没有那么“紧急”。我们希望输入框的值能够即时更新，不然会影响用户的输入体验，会给用户造成卡顿的感觉。而搜索结果的更新可以允许一定的延迟，因为用户可能还没有完整的输入自己需要搜索的文字，又或者搜索本身就需要后端接口来提供。所以，我们会手动对搜索的操作进行防抖来达到这种目的。

```javascript
// Urgent: Show what was typed
setInputValue(input);

// Not urgent: Show the results
setSearchQuery(input);
```

但如果没有防抖处理，像上面的例子这样，这些更新就会马上执行，就有可能出现问题，造成用户体验不好的感觉。所以新的接口 `startTransition`就解决了这样的问题，它通过将你的更新处理变成transitions的更新。这里如果直接翻译成“过渡”可能不好理解，应该是“可转变状态中”的更新，意味着这样的更新不会马上触发。

```javascript
import { startTransition } from 'react';


// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

被包在 `startTransition`里的更新会被认为是不需要即时更新的操作，如果有更加紧急的更新操作（比如说点击或者键盘输入）这些更新就会被中断。如果更新被中断了，react就会停止渲染并且只会渲染之前的更新内容。Transition可以避免代码浪费时间渲染不再相关的内容，同时保证交互上的敏捷。

另一种解决方法就是使用setTimeout。将搜索结果的更新放到setTimeout中，就会被放到任务队列里面，当`setInputValue`的操作执行完之后，才会执行。

```javascript
// Show what you typed
setInputValue(input);

// Show the results
setTimeout(() => {
  setSearchQuery(input);
}, 0);
```

但使用setTimeout和startTransition还是有很大区别的。首先是因为startTransition是马上同步执行的操作，只是里面的操作被标记上了“transitions”，react会根据实际情况去决定要不要去渲染更新。因此startTransition里的更新会相较于setTimeout里的更快被触发，在快的设备上，这两种更新可能不会有太多差距，但是在慢的设备上，差距就会体现出来。另一个主要的区别就是在于startTransiton的更新是可以被中断的，setTimeout只是把任务加到队列里面，之后还是会一直触发更新，这样会一直影响着页面的更新，而startTransiton则直接被中断掉，就不会执行这次渲染了。

[例子](https://github.com/reactwg/react-18/discussions/65)

我们还可以通过useTransition来拿到transitions的pending状态。

```react
import { useTransition } from 'react';


const [isPending, startTransition] = useTransition();

{isPending && <Spinner />}
```

#### React.lazy

我们先来简单了解下什么是SSR。

SSR就是server-side rendering（服务器渲染），好处是能够减少页面首屏打开白屏的时间，以及良好的seo。

react框架本身是单页应用，原理是通过一个html文件里的js不断调用加载其他的js资源来实现页面的渲染和更新，单页应用是属于客户端渲染的方式。在js资源加载的时间里，由于dom还不知道如何呈现，页面就会出现白屏的状态，直到js加载结束。

<img src="/Users/zaihui/Library/Application Support/typora-user-images/image-20210630150656607.png" alt="image-20210630150656607" style="zoom:20%;" />

SSR 允许我们可以在服务端将react的组件渲染加载完成，再将加载好的html发到客户端。尽管可能事件没有及时加载完成，但是用户能够先看到页面的一个大致形状和布局。

<img src="/Users/zaihui/Library/Application Support/typora-user-images/image-20210630150905092.png" alt="image-20210630150905092" style="zoom:20%;" />

在上图这个展示过程，js资源还没完全加载完成，所有页面的点击事件和表单之类的是不会触发事件的，然后等js资源加载完成了之后，也就意味着页面实现了真正的渲染，所有的事件被绑定，数据被更新。

<img src="/Users/zaihui/Library/Application Support/typora-user-images/image-20210630151211356.png" alt="image-20210630151211356" style="zoom:20%;" />

上面的js资源被加载后，将组件渲染出来和事件绑定这个过程，被称为“水合”（**hydration**）。就好像给“干”的html进行一个浇水的过程，来完成网页的渲染。

SSR本身存在的问题

- 需要在渲染前把所有的数据都获取成功
- 水合过程的发生仅能在所有组件都生成之后才能进行，而不能先对部分组件进行水合
- 所有组件的水合是一起发生的，也就意味着在水合完成之前，用户不能对任何组件进行操作

这些问题的原因在于渲染过程是一个瀑布流的过程：fetch data (server) → render to HTML (server) → load code (client) → hydrate (client)，每个阶段都必须等上个阶段完成才能够进行。这也是其低效的原因。所以解决方法就是将某个组件的这些阶段从整体给拆出来。相当于一个完整的页面被分成很多个部分，每个部分的渲染过程相互独立。

react18里面，通过`<Suspense>`可以解决掉上面的问题。

其实在react18之前，就有了`<Suspense>`和`React.lazy`来解决代码拆分的问题。详细请看[这里](https://reactjs.org/docs/code-splitting.html)。但是之前这些api并不支持在ssr中使用。

我们来看下如何使用。下面这个例子里，comments被suspense包住了。在渲染准备好之前，会先渲染Spinner这个组件。通过这样的方式，相当于react知道不需要等待comments就可以直接将html生成并发到客户端。

```react
<Layout>
  <NavBar />
  <Sidebar />
  <RightPane>
    <Post />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </RightPane>
</Layout>
```

<img src="/Users/zaihui/Library/Application Support/typora-user-images/image-20210630155220937.png" alt="image-20210630155220937" style="zoom:20%;" />

而这样的话，一开始的html里是不存在comments这个dom结构的。而当服务端准备好了comments的内容之后，再把额外的html发送到客户端，替换掉spinner的部分。

现在能够把组件的渲染给分离出来了，不需要等所有的数据都在服务端准备后了才发送到客户端。但还有一个问题没有解决，就是页面还是得等所有dom加载完全之后才能一起进行水合的处理。这时我们只要需要将不需要同步渲染出来的comments的代码从一个bundle给拆分出来，这样就能实现提前水合。

使用 `React.lazy` 来进行代码拆分，从而将comments的代码拆分出来。

```react
import { lazy } from 'react';

const Comments = lazy(() => import('./Comments.js'));

// ...

<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

如果存在两个以上的`React.lazy`，react本身还会根据用户的行为进行评估来判断先对哪部分进行水合。

感谢阅读。

#### reference

https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html

https://zhuanlan.zhihu.com/p/379072979