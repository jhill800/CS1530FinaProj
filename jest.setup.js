global.window = {
    addEventListener: jest.fn(),
};
const localStorageMock = (function() {
    let store = {};
    return {
        key(key) {
            return key;
        },
        setItem(key, value) {
            store[key] = value.toString();
            this.length = Object.keys(store).length;
        },
        removeItem(key) {
            delete store[key];
            this.length = Object.keys(store).length;
        },
        clear() {
            store = {};
            this.length = 0;
        },
        getItem(key){
            return store[key];
        },
        get length() {
            return Object.keys(store).length;
        }
    };
})();

global.localStorage = localStorageMock;
global.window.localStorage = localStorageMock;