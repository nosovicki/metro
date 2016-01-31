/* Dmitri Nosovicki © 2008. GPL v.3 or later as published by the Free Software Foundation
 * Демонстрация работы алгоритма оптимального эвристически информированного выбора
 * Демонстрация использования тэта canvas для отображения картографической информации.
 * Источник картографических данных - www.mosmetro.ru
 */
load('data.js', 'search.js', 'map.js', 'unraveller.js')
function Metro(data) {
	var search = new AStar(neighbors, hint, goal)
	var info = this.stationInfo = function (s) {return {name:s, x:data[s][0], y:data[s][1], color:data[s][3]}}
	this.lines = new UnRaveller(function (s){ return data[s][2].dim(0)}, function(s){return data[s][3]}, info).unRavel(data)
	function pythagor(a, b) { return Math.sqrt(a * a + b * b)}
	function ar2lnk(ar) { return {id: ar[0], cost: ar[1]} }
	function time(sec) { return sprintf('% минут : % секунд', Math.floor(sec/60), sec%60)}
	function hint(id) {
		var goal = data[id], abs = Math.abs, k = 1
		return function(state) {
			var st = data[state.id]
			return k * pythagor(abs(st[0] - goal[0]), abs(st[1] - goal[1])) + 200 * (goal[3] != st[3])
		}
	}
	function neighbors(state) { return data[state.id][2].map(ar2lnk) }
	function goal(id) { return function(state) { return state.id == id && state }}
	function resObj(fr, to, t, x) {return x && {fr:fr, to:to, path: x.path, time: time(x.cost), work: x.work, msec: new Date()-t}}
	this.go = function(from, to) { return resObj(from, to, new Date(), search.go(from, goal(to), hint(to))) }
	this.img = Img('data:image/gif;base64,R0lGODlhDAAMAIABAP///83q1iH5BAEKAAEALAAAAAAMAAwAAAIchI8JwaEN3WmGVracxTDfzElUKIFXCUaPpbRAAQA7')
}
function m2(xx, txt) {
	new Map(n(gui.mapEl, 'div'), metro.img, gui.mapW, txt).draw(xx, Object.getValues(metro.lines))
	gui.sel.scrollIntoView()
	return true
}
function Gui(m, t, from) {
	var c = n(t[2][1], 'div', 'className', 'c'), e = this.mapEl = t[1][1]
	var TXT = [ "Кратчайший маршрут между станциями <b>%</b> и <b>%</b>.<br>В пути: <b>%</b> (% перемещений). Поиск занял % секунд (% шагов).",
	'<div>Карта Московского метрополитена',
	'<div class=c style="width:200">Отобразить Ветвь<div style="background:#FFF;border:solid 1px #CCC;text-align:center">',
	'<img src=% onclick="m2(metro.lines[\'%\'], P(this,1).innerHTML, gui.mapW)" style=background-color:%;padding:5px;margin:3px;cursor:pointer>',
	'<b style=color:red;font-size:28px>! </b> Сообщение между станциями <b>%</b> и <b>%</b> еще не открыто.' ]
	function connect(fr, to) {if (!m1(m.go(fr, to))) m2([fr, to].map(m.stationInfo), sprintf(TXT[4], fr, to))}
	function m1(x){return x && m2(x.path.map(m.stationInfo), sprintf(TXT[0], x.fr, x.to, x.time, x.path.length-1, x.msec/1000, x.work))}
	addStyles({'.c':'text-align:center;font:bold 10px tahoma;border:1px solid #CCC;background:#F9F9F9;overflow:hidden;padding:3px'})
	Object.toArray(DATA).map(function(a){n(from, 'option', 'className', 'st', 'value', a[0]).innerHTML = a[0]})
	var to = this.sel = c.appendChild(c.appendChild(from).cloneNode(1)), w = this.mapW = gW(e) + 50
	addEvent(n(c, 'input', 'type', 'submit'), 'click', function(){connect(from.value, to.value)})
	function ii(l){return sprintf(TXT[3], m.img.src, l[0], l[0])}
	new Map(n(e, 'div'), m.img, w, TXT[1], TXT[2] + Object.toArray(m.lines).map(ii).join('')).draw(false, Object.getValues(m.lines))
}
addEvent(window, 'load', function(){ metro = new Metro(DATA); gui = new Gui(metro, tbl(document.body, 2, 1), document.createElement('select'))})
