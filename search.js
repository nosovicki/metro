/* Dmitri Nosovicki © 2008. GPL v.3 or later, as published by the Free Software Foundation
	Heuristic Search reference implementation in JavaScript 
	Avoid Wikipedia (in this particular case), if you want to understand how it works.
	Better search at MIT or Stanford. An example of orrect explanation:
	http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html */
function AStar(neighb, hint, goal) {
	//x:{id,path,cost,ord,work?} lnk:{id,cost}
	var q, v, best, work
	function expand(x) {
		delete q[x.id]
		x.work = work++
		return goal(x) || add(x.path, x.cost, neighb(x)) && expand(best)
	}
	function add(path, cost, links) {
		links.map(function(lnk) { visit(lnk.id, lnk.cost + cost, path.concat(lnk.id)) })
		best = {ord:Infinity}
		for (id in q) if (q[id].ord < best.ord) best = q[id]
		return best.ord != Infinity
	}
	function visit(id, cost, path) {
		if (v[id] == undefined || v[id] > cost) {
			v[id] = cost;
			(q[id] = {id: id, path: path, cost: cost, ord: cost}).ord += hint(q[id])
		}
	}
	this.go = function(start, gf, hf, nf) {
		goal = gf || goal, hint = hf || hint, neighb = nf || neighb, work = 0, q = {}, v = {}
		return expand({id: start, path: [start], cost: 0, ord: 0})
	}
}
