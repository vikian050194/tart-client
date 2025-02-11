export const compose = (...fns) => fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
);

export const throttle = (func, delay) => {
    let prev = 0;
    return (...args) => {
        let now = new Date().getTime();

        if (now - prev > delay) {
            prev = now;
            return func(...args);
        }
    };
};

export class LocalStorage {
    static get(key) {
        try {
            const serializedState = localStorage.getItem(key);

            if (serializedState === null) {
                return undefined;
            }

            return JSON.parse(serializedState);
        } catch {
            return undefined;
        }
    }

    static set(key, value) {
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
}
