// Dmitri Nosovicki © 2008. GPL v.3 or later, as published by the Free Software Foundation
function Canvas(parent, w, h, cssClass) {
	var c  = this.context = n(parent, 'canvas', 'width', w, 'height', h, 'className', cssClass).getContext('2d')
	if (!c) return map.innerHTML = 'Map drawing is not supported by this browser.'
	function path(w, style, a) {
		c.strokeStyle = style
		c.lineWidth = w
		c.lineCap = 'round'
		c.lineJoin = 'bevel'
		c.moveTo(a[0].x, a[0].y)
		c.beginPath()
		a.map(function(s){ c.lineTo(s.x, s.y) })
		c.stroke()
	}
	function circle(w, r, stroke, fill, x, y) {
		c.lineWidth = w
		if (stroke) c.strokeStyle = stroke
		if (fill) c.fillStyle = fill
		c.beginPath()
		c.arc(x, y, r, 0, Math.PI*2, true)
		if (stroke) c.stroke()
		if (fill) c.fill()
	}
	function full(a) {
		var i = 1200
		var colors = ['#fff'], j = 0
		while ((i/=1.4)>20) circle(0, i*1.2, 0, colors[j++], 480, 480)
		a.map(function(a){path(9, a[0].color, a)})
	}
	function map(img, a, o) {
		c.globalAlpha = 1;
		circle(0, 1000, 0, 'rgba(255,255,255,.8)', 480, 480)
		var grp = a.group(function(o){return o.color}), starts = grp.dim(0), ends = grp.map(function(a){return a[a.length - 1]})
		starts.shift()
		ends.pop();
		[ends, starts].transpose().map(o.drawTransition)
		grp.map(function(a){path(9, a[0].color, a)})
		o.drawMap(img, a)
	}
	this.drawMapPath = function(img, a, fullMap) {
		if (fullMap) full(fullMap)
		if (a) map(img, a, this)
	}
	this.drawTransition = function(a) {
		a.map(function(o){ circle(1, 23, '#800', 0, o.x, o.y)})
		c.lineCap = 'butt'
		path(47, '#800', a)
		c.lineCap = 'round'
		path(45, 'white', a)
	}
	this.autoScale = function(a) {
		c.translate(w * .05, h * .05)
		c.scale(.9, .9)
		var b = [Infinity, Infinity, 0, 0], m = Math.min, x = Math.max
		a.map(function(a){ b[0] = m(a.x, b[0]); b[2] = x(a.x, b[2]); b[1] = m(b[1], a.y); b[3] = x(b[3], a.y) })
		var ww = b[2] - b[0], hh = b[3] - b[1]
		var sc = m(w / ww, h / hh, 1)
		c.scale(sc, sc)
		c.translate(-b[0] + (w - ww*sc)/2/sc, -b[1] + (h - hh*sc)/2/sc)
	}
	this.drawMap = function(i, a) {
		a.map(function(s){
			circle(1, 9, 'black', 'white', s.x, s.y)
			circle(3, 4, s.color, 0, s.x, s.y)
		})
	}
	this.drawMap1 = function(a) {
		a.map(function(s){ circle(0, 9, 0, s.color, s.x, s.y) })
	}
	this.drawPath = path
	this.drawCircle = circle
}
