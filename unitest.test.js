// retrieveItemsFromLocalStorage.test.js
const { retrieveItemsFromLocalStorage } = require('./script.js');

describe('retrieveItemsFromLocalStorage', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem('item1', 'value1');
        window.localStorage.setItem('item2', 'value2');
    });

    it('should retrieve items from localStorage and return them as an array of objects', () => {
        expect(window.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
        window.localStorage.clear();
        window.localStorage.setItem('item1', 'value1');
        window.localStorage.setItem('item2', 'value2');
        const expected = [
            { key: 'item1', value: 'value1' },
            { key: 'item2', value: 'value2' }
        ];
        const result = retrieveItemsFromLocalStorage();
        expect(result).toEqual(expected);
    });
});