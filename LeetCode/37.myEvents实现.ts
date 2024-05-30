// 实现myEvent类，构造的实例可以有on，off，once，trigger四个方法，实现观察者模式
interface MyEventProps {
    events: {
        [propsName: string]: any
    }
}
class MyEvent implements MyEventProps {
    events = {}

    on = (eventName, cb, ...args) => {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push({cb, args: args})
    }

    off = (eventName, cb) => {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(v => v.cb !== cb)
        }
    }

    once = (eventName, cb, ...args) => {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        const onceEv = (...args) => {
            cb.call(this, ...args)
            this.off(eventName, onceEv)
        }
        this.events[eventName].push({cb: onceEv, args: args})
    }

    trigger = (eventName: string, ...args: any[]) => {
        const callbacks = this.events[eventName];
        if (callbacks) {
            callbacks.forEach((callback: any) => {
                callback.cb(...args, ...callback.args);
            });
        }
    }
}