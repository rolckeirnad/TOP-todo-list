function eventsDispatcher() {
    let events = {};
    let temp = [];
    const on = (eventName, fn, unsubscribe) => {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
        if (unsubscribe) temp.push({ eventName, fn });
    };
    const off = (eventName, fn) => {
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if (events[eventName][i] === fn) {
                    events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    };
    const emit = (eventName, data) => {
        if (events[eventName]) {
            events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    };
    const removeTempEvents = () => {
        for (let each of temp) {
            off(each.eventName, each.fn);
        }
    }

    return {
        on,
        off,
        emit,
        removeTempEvents,
    }
};

const events = eventsDispatcher();

export default events;