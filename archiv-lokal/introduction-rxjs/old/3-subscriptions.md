# Subscriptions

* Subscription mechanism is handled by Observer
* Returns a Subscription object, which you can use to unsubscribe or dispose

> Unsubscribe fills in the gap of the native JavaScript system, where cancelling events and disposing of them correctly has always been problematic. For instance: An infinite stream of clicks (the completed signal will never actually fire).

```javascript
const infinteStream = Rx.Observable.interval(1000)
						// alternative
						.do(x => console.log(x))
						// alternative
						.forEach(x => console.log(x))
						.subscribe();
infinteStream.dispose();
```