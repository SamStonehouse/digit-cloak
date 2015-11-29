var Cloak = require('../cloak');

describe('Cloak creation', function() {

	var cloak;

	beforeEach(function() {
		cloak = new Cloak();
	});

	it('should instansiate a new instance with no values', function() {
		expect(cloak.getValues().length).toBe(0);
	})

	it('should create a new instance with no masks', function() {
		expect(Object.keys(cloak.getMasks()).length).toBe(0);
	});

});

describe('Creating a mask with initial values', function() {
	it('should create a mask with a single value', function() {
		var cloak = new Cloak(['apple']);

		expect(cloak.getValues().length).toBe(1);
	});

	it('should create a mask with multiple values', function() {
		var cloak = new Cloak(['apple', 'banana', 'kiwi']);

		expect(cloak.getValues().length).toBe(3);
	});
});

describe('Adding values to existing masks', function() {
	var cloak;

	beforeEach(function() {
		cloak = new Cloak();
	});

	it('should add a value and return a mask', function() {
		var valueToMask = 'banana';
		var mask = cloak.addValue(valueToMask);

		expect(mask).toBe(1);
		expect(cloak.getValues()[0]).toBe('banana');
		expect(cloak.getMaskForValue('banana')).toBe(1);

		var valuesFromMask = cloak.getValuesFromMask(1);

		expect(valuesFromMask.length).toBe(1);
		expect(valuesFromMask[0]).toBe('banana');
	});

	it('shuld add multiple values and return a mask', function() {

	});
});

describe('Getting masks from values', function() {
	it('should return a mask for a given value', function() {
		var cloak = new Cloak(['apple', 'banana', 'kiwi']);

		expect(cloak.getMaskForValue('apple')).toBe(1);
		expect(cloak.getMaskForValue('banana')).toBe(2);
		expect(cloak.getMaskForValue('kiwi')).toBe(4);
		expect(cloak.getMaskForValue('carrot')).toBe(undefined);

	});

	it('should return whether a given value is in this bitmask', function() {
		var cloak = new Cloak(['apple', 'banana', 'kiwi']);

		expect(cloak.hasValue('apple')).toBe(true);
		expect(cloak.hasValue('kiwi')).toBe(true);
		expect(cloak.hasValue('carrot')).toBe(false);
	});
});