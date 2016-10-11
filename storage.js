//Simple Queue using array storage
//2016-28-08  Checked with storageTest.js
'use strict';

var storage = {maxSize : {}};

var api = (function() {

	return { createQueue : createQueue,
		enQueue : enQueue,
		deQueue : deQueue,
		getQueue : getQueue,
		listQueue : listQueue
	}

	function createQueue(qname,maxSize) {
		if (qname && !storage.hasOwnProperty(qname)) {
			if (maxSize && !isNaN(maxSize)) {
				storage.maxSize[qname] = maxSize;
				// console.log(storage.maxSize[qname]);
			}
			storage[qname] = [];
		}
	}

	function enQueue(qname,item) {
		if (qname && item && storage.hasOwnProperty(qname) && (!storage.maxSize.hasOwnProperty(qname) || storage[qname].length < storage.maxSize[qname])) {
			storage[qname].push(item);
		}	
	}

	function deQueue(qname) {
		if (qname && storage.hasOwnProperty(qname)) {
			var result = storage[qname].shift();
			return (result !== undefined ? result : null);
		} else return null;
	}

	function getQueue(qname) {
		if (qname && storage.hasOwnProperty(qname)) {
			return storage[qname];
		}
	}

	function listQueue(qname) {
		if (qname && storage.hasOwnProperty(qname)) {
				storage[qname].forEach(item => {console.log(item);}
			);
		} 
	}
})();

module.exports = api;



