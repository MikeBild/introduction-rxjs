const Rx = require('rx');

Rx.Observable
	.interval(1000)
	.do(x => console.log(x))
	.subscribe()