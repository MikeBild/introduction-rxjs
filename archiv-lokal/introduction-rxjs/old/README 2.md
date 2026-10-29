# RxJS Tutorial

## Asynchronous Programming is difficult

* remain responsive application at all times
* main issue is that IO operations
* process user input, fetch data, run long-running computations simultaneously without halting the application
* a model where time and latency become key issues
* for simple application use JavaScript’s main event system libraries
* asynchronous computations are difficult to manage

## [NodeJS / JavaScript Asynchronous Programming Models](1-introduction.md)

* Callbacks
* Promises
* Event-Emitter
* Streams

## Examples

[CPU bound scaling](examples/cpu-bound.js)
[Event Sourcing](examples/event-sourcing.js)