var chai = require('chai');
var expect = chai.expect;

const multiply = function(a, b) {
    return a * b;
}

describe('multiply function', function() {
    it('should multiply 2 numbers', () => {
        // Given
        const aNumber = 5;
        const anotherNumber = 10;

        // When
        const result = multiply(aNumber, anotherNumber);

        // Then
        const expected = 50;
        expect(result).to.equal(expected);
    })
});
