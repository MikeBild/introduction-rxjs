const Rx = require('rx');

const bookCar = id => Rx.Observable.return({sagaId: id, 'Car A': true}).delay(1000);
const bookHotel = id => Rx.Observable.return({sagaId: id, 'Hotel B': true}).delay(1000);
const bookFlight  = id => Rx.Observable.return({sagaId: id, 'Flight C': true}).delay(1000);
//const bookFlight  = id => Rx.Observable.throw({sagaId: id, 'Flight C': true}).delay(1000);

const compensateBookCar = id => Rx.Observable.return({sagaId: id, 'Car A': false}).delay(1000);
const compensateBookHotel = id => Rx.Observable.return({sagaId: id, 'Hotel B': false}).delay(1000);
const compensateBookFlight  = id => Rx.Observable.return({sagaId: id, 'Flight C': false}).delay(1000);

const sagaStream = Rx.Observable.return({ metadata: 'foo bar' });

startSaga('Booking 1', sagaStream)
	.do(x => console.log(`Saga state: ${JSON.stringify(x)}`))
	.doOnError(error => console.error(`Saga error: ${error.message}`))
	.doOnCompleted(() => console.log('Saga completed'))
	.subscribe();

function startSaga(sagaId, initialStream) {
	const stepStream = Rx.Observable.concat([bookCar(sagaId), bookHotel(sagaId), bookFlight(sagaId)]);
	const compensationStream = Rx.Observable.merge([compensateBookCar(sagaId), compensateBookHotel(sagaId), compensateBookFlight(sagaId)]);

	return initialStream
		.map(x => Object.assign(x, {sagaId: sagaId}))
		.merge(stepStream)
		.catch(compensationStream)
		.scan((state, step) => Object.assign(state, step));
}
