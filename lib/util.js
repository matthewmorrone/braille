var log = console.log.bind(console)

function Nihil() {}
Nihil.prototype = Object.create(null)

function isObject(object) {
	var type = typeof object
	return type === 'function' || type === 'object' && !!object
}

var nativeAlert = window.alert
window.alert = function() {
	return nativeAlert(arguments.join("\n"))
}

Object.defineProperty(Object.prototype, "define", {
	configurable: true,
	enumerable: false,
	writable: false,
	value: function(name, value) {
		if (Object[name]) {
			delete Object[name]
		}
		Object.defineProperty(this, name, {
			configurable: true,
			enumerable: false,
			value: value
		})
		return this
	}
})
  function iter() {
    var internal = -1
    return function() {
      internal++
      return internal
    }
  }
Object.prototype.define("extend", function(src) {
	var target = this
	if (isObject(src)) {
		for (var o in src) {
			if (Object[src[o]]) {
				delete Object[src[o]]
			}
			this.define(o, src[o])
		}
	}
	return this
})
Array.prototype.define("flatten", function(ret){
  var arr = this, ret = ret || [], len = arr.length
  for (var i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      arr[i].flatten(ret)
    } else {
      ret.push(arr[i])
    }
  }
  return ret
})
Array.prototype.define("first", function() {
  return this[0]
})
Array.prototype.define("start", function() {
  return 0
})
Array.prototype.define("end", function() {
  return this.length - 1
})
Array.prototype.define("last", function() {
  return this[this.length - 1]
})
Array.prototype.define("each", Array.prototype.forEach)
// Array.define("fill", function(n) {
//   return Array.apply(null, Array(n)).map(function (_, i) {
//     return i
//   })
// })
// Array.apply(null, Array(26)).map(function (item, index) {
//     return String.fromCharCode(65 + index);
// });
// // However, for your specific use case, your best solution would probably just be
// 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

String.prototype.define("remove", function(a) {
  return this.replace(a, "")
})

// var nativeReplace = String.prototype.replace
// String.prototype.define("replace", function(a, b) {
//   return nativeReplace(a, b || "")
// })


Number.prototype.define("base", function(b, c) {
	var s = "",
		n = this;
		if (!c) {
			c = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
		}
	if (b > (c).length || b < 2) {
		return ""
	}
	while (n) {
		s = c[n % b] + s, n = Math.floor(n / b)
	}
	return s
})
String.prototype.define("base", function(b, c) {
	var s = "",
		n = this;
		if (!c) {
			c = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
		}
	if (b > (c).length || b < 2) {
		return ""
	}
	while (n) {
		s = c[n % b] + s, n = Math.floor(n / b)
	}
	return s
})
Number.prototype.define("abs", function() {
	return Math.abs(this)
})

Function.prototype.define("repeat", function(n) {
	n = n || 2
	var m = 0,
		p = "",
		r = ""
	while (m < n) {
		p = 0
		p = "" + this.call()
		if (p) {
			r += p
		}
		m++
	}
	return "" + r
})

Function.prototype.define("iter", function() {
	var internal = 0
	return function() {
		internal++
		return internal
	}
})

String.prototype.define("replaceAt", function(index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length)
})
String.prototype.define("swap", function(i1, i2) {
	var temp = this[i1]
	return this.replaceAt(i1, this[i2]).replaceAt(i2, temp)
})
String.define("format", function(format) {
	var args = Array.prototype.slice.call(arguments, 1)
	return format.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match
	})
})

String.prototype.define("format", function() {
  var args = Array.prototype.slice.call(arguments, 0);
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match
	})
})
// String.format = function(format) {
//   var args = Array.prototype.slice.call(arguments, 1);
//   return format.replace(/{(\d+)}/g, function(match, number) {
//     return typeof args[number] != 'undefined' ? args[number] : match;
//   });
// }
// String.prototype.format = function() {
//   return this.replace(/{(\d+)}/g, function(match, number) {
//     return typeof arguments[number] != 'undefined' ? arguments[number] : match;
//   });
// }


String.prototype.define("pad", function(n, char) {
	return (new Array(++n - this.length)).join(char || '0') + this
})
String.prototype.define("padLeft", String.prototype.pad).define("padRight", function(n, char) {
	return this + (new Array(++n - this.length)).join(char || '0')
})
String.prototype.define("replaceAll", function(a, b) {
	return this.split(a).join(b)
})
String.prototype.define("trim", function() {
	return this.replace(/^\s+|\s+$/g, '')
})
