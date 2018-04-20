class Results {
	constructor(label) {
		this.label = label;
		this.data = {};
	}	

	setValue(label, value) {
		this.data[label] = value;
	}

	getValue(label) {
		return this.data[label];
	}
}