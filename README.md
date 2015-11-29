Cloak is a small node.js library for managing bitmasks for a set of values

I built it to allow me to send a large number of true/false values over a network without having more information than requred. Cloak takes your set of values and returns a bitmask value for each one, for example:

    var values = ['apple', 'orange', 'banana', 'carrot', 'potato']

    var cloak = new Cloak(values);

This gives each value a mask such that

apple = 1
orange = 2
banana = 4
carrot = 8
potato = 16

To get a subset of these values we can then add up the mask values and when required, cloak can turn those masks back into a set of values

So if we needed to pass a message to say 'apple', 'banana' and 'carrot' we would send 1 + 4 + 8 (13)

Then to get those values back from our number it would be

cloak.getValuesFromMask(13);

Which returns

    => ['apple', 'banana', 'carrot'];


Values can be added dynamically but not removed, remove and set value functionality may be added at a later date.

    cloak.addValue('leak');

Which returns the mask value for that added value

    => 32

This also works with an array of values via addValues()

	cloak.addValues(['onion', 'grape']);

Again this returns an array of masks 

	=> [64, 128]

You can fetch the key-value pair object to check what values are used

	cloak.getMasks();

	=> {
		1: 'apple',
		2: 'orange',
		4: 'banana',
		8: 'carrot',
		16: 'potato',
		32: 'leak',
		64: 'onion',
		128: 'grape'
	}

## Limitations

Due to the number limit of JS there's a limit of ~30 values which this can provide masks for. In the near future I aim to update this to use bignum.js to increase that, hoping that it won't cause too much of a slowdown when doing a large bitwise add.

It doesn't accept objects and arrays as values due to the way I've implimented it


## Future work

- Finish tests
- Make the whole thing immutable
- Use bignum.js for dealing with larger numbers
- Make method names use proper language
- Allow all JS types to be used as array values