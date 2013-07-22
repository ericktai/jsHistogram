(function() {

	/**
	 Guarantee that a field is a string
	 */
	function generatefield(field) {
		return '' + field;
	}

	/**
	 Declare class
	 */
	var Histogram = this.Histogram = function() {
		this.map = {};
	}

	/**
	 Add an item to the histogram.

	 `field` is the field to increment on.
	 `value` is the amount to increment by.  If `value` is not set, it defaults to 1.

	 // { population: 10000 }

	 histogram.add('population');

	 // { population: 10001 }

	 histogram.add('population', 10000);

	 // { populiation: 20001 }


	 @param field The field to add to
	 @param value (optional) Increment the field count by `value`
	 */
	Histogram.prototype.add = function(field, value) {
		var fieldString = generatefield(field);
		this.map[fieldString] = (this.map[fieldString] || 0) + (value || 1);
	}

	/**
	 Get the count of the field
	 */
	Histogram.prototype.get = function(field) {
		return this.map[generatefield(field)];
	}

	Histogram.prototype.set = function(field, value) {
		this.map[generatefield(field)] = value;
	}

	Histogram.prototype.getAll = function() {
		return this.map;
	}

	Histogram.prototype.clear = function(field) {
		if (!field) this.map = {};
		else delete this.map[generatefield(field)];
	}

	Histogram.prototype.tally = function(data, field) {
		var action = function(point) {
			!field ? this.add(point) : this.add(point[field]);
		};

		this.each(data, action);
	}

	Histogram.prototype.aggregate = function(data, field) {
		var action = function(point) {
			!field ? this.add(point) : this.add(field, point[field]);
		};

		this.each(data, action);
	}

	Histogram.prototype.each = function(data, action) {
		if (Array.isArray(data)) {
			for (var i = 0; i < data.length; i ++) {
				action.call(this, data[i]);
			}
		}
	}
}).call(this);