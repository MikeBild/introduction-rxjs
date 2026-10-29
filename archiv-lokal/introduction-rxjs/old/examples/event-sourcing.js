const fs = require('fs');
const Rx = require('rx');
const RxNode = require('rx-node');

const timerStream = new Rx.Subject();
const initialState = {count: 0};
const updateState = (state, msg) => {
	state.count++;
	return state;
};
const currentState = state => console.log(state)

// simulate a publisher
Rx.Observable.interval(1000)
	.map(x => ({type: 'timer', payload: x}))
	.do(x => timerStream.onNext(x))
	.subscribe();

// share the state stream for multiple subscribers
const currentStateStream = eventLogSubscription(timerStream, initialState, updateState);

// attach first subscriber
currentStateStream	
	.do(currentState)
	.subscribe();

// attach second subscriber
currentStateStream
	.do(currentState)
	.subscribe();

function eventLogSubscription(stream, initialState, updateStateFn) {
	RxNode.writeToStream(stream.map(x => JSON.stringify(x)+'\n'), fs.createWriteStream('./time-events.log', {'flags': 'a'}));
	return RxNode.fromReadableStream(fs.createReadStream('./time-events.log'))
		.map(x => x.toString().split('\n').filter(x => x))
		.map(x => Rx.Observable.fromArray(x))
		.mergeAll()
		.map(x => JSON.parse(x))
		.merge(stream)
		.scan(updateStateFn, initialState)
		.share();
}