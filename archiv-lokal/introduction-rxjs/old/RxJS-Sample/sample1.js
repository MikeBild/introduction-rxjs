var rx = require('rx');

var timeStream = rx.Observable.interval(1000);

var s1 = timeStream
  .where(function(x){
    return x % 2 === 0;
  });

var s2 = timeStream
  .where(function(x){
    return x % 2 !== 0;
  });

s2
.zip(s1, function(x,y){
  return {x:x,y:y};
})
.do(function(x){
  console.log(x);
})
// .subscribe();

timeStream
  .windowWithCount(5)
  .map(function(x){
    return x.sum();
  })
  .flatMap(function(x){
    return x;
  })
  .do(function(x){
    console.log(x);
  })
  .subscribe();


