const Rx = require('rx');

const coinsStream = Rx.Observable.fromArray([1,2,5,10,20,50,100].reverse());

Rx.Observable
  .using(() => new CoinResource(9), resource => coinsStream.map(x => ({ amount: resource.getValue(), coin: x })))
  .reduce((state, e) => {
    const amount = (state.length > 0) ? state[state.length-1].rest : e.amount;
    state.push({
      coin: e.coin,
      number: Math.floor(amount/e.coin),
      rest: amount%e.coin,
    });
    return state;
  }, [])
  .do(x => console.log(JSON.stringify(x)))
  .subscribe();

function CoinResource(value) {
  this.value = value;
  this.disposed = false;
  this.getValue = () => {
    if (this.disposed) throw new Error('Object is disposed');
    return this.value;
  };
  this.dispose = () => {
    // release resource
    if (!this.disposed) {
        this.disposed = true;
        this.value = null;
    }
  };
}
