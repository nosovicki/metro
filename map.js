// Dmitri Nosovicki © 2008. GPL v.3 or later, as published by the Free Software Foundation
load('canvas.js')
function Map(el, img, w, caption, intro) {
	var d = n(el, 'div', 'className', 'u'),
		 t = tbl(n(d, 'div'), 1, 2),
		 lst = t[1][2],
		 map = t[1][1]
		 txt = ['<tr><td><img style="background-color:%" src=%><td>%. %',
		 'padding:0 5px 0 0;font:10px tahoma',
		 'width:%px;background:#F9F9F9;border:1px solid #CCCCCC;margin:10px 0 10px 0;padding:3px;text-align:center;font:10px tahoma',
		 'border:1px solid #CCCCCC;background:#FFF;overflow:hidden;padding:5px']
	function row(o, n) { return sprintf(txt[0], o.color, img.src, n + 1, o.name) }
	n(d, 'span').innerHTML = caption
	addEvent(n(d,'button', 'style', 'margin:7px auto 0 auto;display:block', 'innerHTML', 'Закрыть'), 'click', function(){P(d,1).remove(d)})
	addStyles({'table.legend td':txt[1], '.u':sprintf(txt[2], w + 20), '.u>div':txt[3]})
	this.draw = function(a, fullMap) {
		lst.innerHTML = a? ('<table class=legend>'+ a.map(row).join('')): intro
		var c = new Canvas(map, w - gW(lst), gH(lst), 'map')
		c.autoScale(a||fullMap.accum(function(a, res){return res.concat(a)}, [], false))
		c.drawMapPath(img, a, fullMap)
	}
	this.clear = function() { lst.innerHTML = map.innerHTML = '' }
}
