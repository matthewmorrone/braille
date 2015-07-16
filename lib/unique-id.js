
var log = console.log.bind(console);
Number.prototype.base26 = (function () {
  return function base26() {
    n = this
    ret = "";
    while(parseInt(n)>0){
      --n;
      ret += String.fromCharCode("A".charCodeAt(0)+(n%26));
      n/=26;
    }
    return ret.split("").reverse().join("");
  };
}());

function iter() {
    var internal = 0;
    return function() {
        internal++;
        return internal.base26();
    };
}
var uniq = iter();
Function.prototype.repeat = function(n) {
    var m = 0;
    while(m < n) {
        this.call()
        m++;
    }    
}
var out = function out() {
    console.log(uniq())
}

out.repeat(100)
