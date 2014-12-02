/**
 * Data Object
 * Manages object data and provides matching object properties
 * @author Lucas Costa
 * @class
 */
FacebookAdsApi.DataObject = function(fields) {
	var _this = this,
		ownPublicMethods = [],
		dataFields = [];
		persistedData = {};

	/**
	 * @param {Object} newData
	 * @returns this
	 */
	this.setData = function(newData) {
		if (!ownPublicMethods.length) 
			setOwnPublicMethods();
		var properties = Object.keys(newData);
		dataFields = [];
		for (i = properties.length - 1; i >= 0; i--) {
			var prop = properties[i];
			if (ownPublicMethods.indexOf(prop) >= 0)
				throw new Error('Data contains a method conflicting property');
			_this[prop] = newData[prop];
	  		dataFields.push(prop);
		}
		persistedData = newData;
		return _this;
	};

	/**
	 * @return {Object}
	 */
	this.getData = function() {
		var data = {};
		for (i = dataFields.length - 1; i >= 0; i--) {
			data[dataFields[i]] = _this[dataFields[i]];
		}
		return data;
	};

	/**
	 * @return {Object}
	 */
	this.getPersistedData = function() {
		return persistedData;
	};

	/**
	 * Shallow comparisson between persisted data and current data
	 * @return {Object}
	 */
	this.getChangedData = function() {
		var changedData = {};
		for (i = dataFields.length - 1; i >= 0; i--) {
			if(_this[dataFields[i]] != persistedData[dataFields[i]])
				changedData[dataFields[i]] = _this[dataFields[i]];
		}
		return changedData;
	};

	/**
	 * Persist current data
	 * @return {Object} this
	 */
	this.persistData = function() {
		for (i = dataFields.length - 1; i >= 0; i--) {
			persistedData[dataFields[i]] = _this[dataFields[i]];
		}
		return _this;
	};

	/**
	 * Reset data to persisted state
	 * @return {Object} this
	 */
	this.resetData = function() {
		for (i = dataFields.length - 1; i >= 0; i--) {
			_this[dataFields[i]] = persistedData[dataFields[i]];
		}
		return _this;
	};

	/**
	 * Set object's methods array for conflict prevention
	 */
	function setOwnPublicMethods() {
		for (var prop in _this) {
			if (typeof _this[prop] == 'function') ownPublicMethods.push(prop);
		}
	}

	return this;
};