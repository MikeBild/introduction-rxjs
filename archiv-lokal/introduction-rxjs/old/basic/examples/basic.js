var rx = require("..")

function test() {
  var as = new rx.AsyncSubject()
  setTimeout(function() {
    as.onNext("works!")
    as.onCompleted()
  }, 500)
  return as
}

var a = test().subscribe(function(result) {
  console.log("Got result: "+result)
})
