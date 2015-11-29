var bignum = require('bignum');
var _ = require('lodash');

'use strict';

/**
* Mask is a method of providing true/false parameters in a simple format.
*
* Using binary & to compare a provided mask with all the masks it has.
*/

var Cloak = function(values) {
	this.numMasks = 0;
	this.masks = {};
	this.reverseMasks = {};
	this.values = [];

	if (values !== undefined) {
		if (Array.isArray(values)) {
			this.addValues(values);
		} else {
			this.addValue(values);
		}
	}	
};

Cloak.prototype.addValue = function(value) {
	var newMask = Math.pow(2, this.numMasks);
	this.masks[newMask] = value;
	this.reverseMasks[value] = newMask;
	this.values.push(value);
	this.numMasks++;
	return newMask;
};

Cloak.prototype.addValues = function(values) {
	var masks = [];
	for (var key in values) {
		if(values.hasOwnProperty(key)) {
			masks.push(this.addValue(values[key]));
		}
	}
	return masks;
};

Cloak.prototype.hasValue = function(value) {
	return (this.values.indexOf(value) !== -1);
};

Cloak.prototype.getMaskForValue = function(value) {

	if (_.has(this.reverseMasks, value)) {
		return this.reverseMasks[value];
	}

	return undefined;
};

Cloak.prototype.getValuesFromMask = function(mask) {
	if (typeof mask === 'undefined') {
		return [];
	}

	var returnVals = [];

	for (var key in this.masks) {
		if (this.masks.hasOwnProperty(key)) {
			if ((mask & key) > 0) {
				returnVals.push(this.masks[key]);
			}
		}
	}

	return returnVals;
};

Cloak.prototype.getValues = function() {
	return this.values;
};

Cloak.prototype.getMasks = function() {
	return this.masks;
};

Cloak.prototype.getReverseMasks = function() {
	return this.reverseMasks;
};

module.exports = Cloak;