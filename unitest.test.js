// retrieveItemsFromLocalStorage.test.js
const { retrieveItemsFromLocalStorage } = require('./script.js');

describe('retrieveItemsFromLocalStorage', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem(0, 'value1');
        window.localStorage.setItem(1, 'value2');
    });

    it('should retrieve items from localStorage and return them as an array of objects', () => {
        expect(window.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
        const expected = [
            { key: 0, value: 'value1' },
            { key: 1, value: 'value2' }
        ];
        const result = retrieveItemsFromLocalStorage();
        expect(result).toEqual(expected);
    });
});