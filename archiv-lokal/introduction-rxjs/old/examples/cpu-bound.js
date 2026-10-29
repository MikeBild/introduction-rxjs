const Rx = require('rx');
const RxNode = require('rx-node');
const spawn = require('child_process').spawn;

RxNode.fromStream(spawn('find', ['/','-type','f','-exec', 'cat', '{}', '\+']).stdout)
	.map(x => x.toString())
	// using python
	.map(x => RxNode.fromStream(spawn('./word-count.py', [x]).stdout))
	// using javascript
	//.map(x => RxNode.fromStream(spawn('./word-count.js', [x]).stdout))
	.mergeAll()
	.map(x => x.toString())
	.do(x => console.log(x))
	.subscribe();
