// Dmitry Nosovitsky © 2005-2007
function P(el, level) { return level > 0 ? P(el.parentNode, level - 1) : el }
Array.prototype.group = function(f) {
	var hash = {}, res = []
	for (var i = 0; i < this.length; i++) {
		var key = f(this[i])
		if (!hash[key]) hash[key] = []
		hash[key].push(this[i])
	}
	for (i in hash) res.push(hash[i])
	return res
}
Array.prototype.accum = function(func, identity, recur, context) {
	// accumulate one level
	function i(rv, a) {
		return (a.length) ? i(func.call(context, a.shift(), rv), a) : rv
	}
	function r(a) {
		return (a.length) ? func.call(context, a.shift(), r(a)) : identity
	}
	var a = this.copy()
	return recur ? r(a) : i(identity, a)
}
function gH(el) {
	return (el)? el.clientHeight : self.innerHeight || (document.documentElement||{}).clientHeight || (document.body||{}).clientHeight
}
Object.getValues = function(o) {
	return Object.toArray(o).dim(1)
}
Array.prototype.pushAt = function(o, i) {
	//creates || reformats into || pushes to a new dimension
	this[i] = [].concat((this[i]||[]), isArray(o)? [o] : o)
	return this
}
function isArray(o) {
	return o instanceof Array
}
Array.prototype.transpose = function() {
	//transpose matrix (rows become columns)
	if (!this.length >= 2 || !isArray(this[0])) return this.copy()
	else {
		var r = [], i = 0, j = 0
		for (; i < this.length; i++) {
			for (j = 0; j < this[i].length; j++) {
				r.pushAt(this[i][j], j)
			}
		}
		return r
	}
}
function sprintf() {
	var a = Object.toArray(arguments)
	return [a.shift().split('%'), a].transpose().map(function(a){return a.join('')}).join('')
}
function gW(el) {
	return (el)? el.clientWidth : (self.innerWidth||(document.documentElement||[]).clientWidth||(document.body||[]).clientWidth)
}
function gg(o, t) {return o.getElementsByTagName(t)}
function addStyle(a) {
	var s = document.styleSheets
	if (!s.length) gg(document, 'head').item(0).innerHTML += '<style type="text/css">' + a[0] + ' {' + a[1] + '}' + '</style>'
	else if (window.ActiveXObject) s[0].addRule(a[0], a[1])
	else s.item(0).insertRule(a[0] + ' {' + a[1] + '}', s.length)
}
function addStyles(o) { Object.toArray(o).map(addStyle) }
function addAttr(o, a) {if (typeof o == 'object') o[a[0]] = a[1]; return o}
Array.prototype.copy = function(o) {
	return this.concat();
}
Array.prototype.pack = function(n){
	a	= this.copy(), rv = []
	while(a.length) rv.push(a.splice(0, n))
	return rv
}
Object.toArray = function(o) {
	var r = [], l = o.length, i = 0
	if (o.length) {
		for (; i < l; i++) r.push(o[i])
	} else {
		for(i in o) r.push([i, o[i]])
	}
	return r
}
function n(/* o, s, [attr,val...]*/) {
	var v = Object.toArray(arguments).pack(2), e = v.shift()
	return v.reduce(addAttr, e[0].appendChild(document.createElement(e[1])))
}
function tbl(el, rows, cols) {
	var a = [], t = document.createElement('table'), b = n(t, 'tbody')
	for (var i = 1; i <= rows; i++) {
		(a[i] = [])[0] = n(b, 'tr')
		for (var j = 1; j <= cols; j++) a[i][j] = n(a[i][0], 'td')
	}
	el.appendChild(a[0] = t)
	return a
}
function Img(href){
	var img = new Image()
	img.src = href
	return img
}
function load() { for (p in arguments) w('<script type="text/javascript" src="' + arguments[p] + '"></script>') }
function w(s) {document.write(s)}
function addEvent(o,e,f){
	if (o.addEventListener){ o.addEventListener(e,f,false); return true; }
	else if (o.attachEvent) return o.attachEvent("on"+e,f)
	return o
}
Array.prototype.dim = function(i) {
	return this.map(function (a) {return a[i]})
}

