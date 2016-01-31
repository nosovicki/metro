/* Dmitri Nosovicki © 2008. GPL v.3 or later, as published by the Free Software Foundation
	Untangles scattered data that has relations into hash of lists.
	Relations are encapsulated in getNeigbors function.
	Group membership is encapsulated in getGroup.
	Exact resulting data are shaped by getInfo function
	Note: item can have up to 2 linked items of same group */
function UnRaveller(getNeigbors, getGroup, getInfo) {
	//	function getNeigbors(s){ return data[s][2].dim(0)}
	//	function getGroup(s){return data[s][3]}
	//	function getInfo(s) {return {name:s, x:data[s][0], y:data[s][1], gid:data[s][3]}}
	this.unRavel = function(data) {
		function unwind(s, gid, links) {
			function go(cur, links, from) {
				return [getInfo(cur)].concat(links.reduce(function(res, name){
					return (name != from && getGroup(name) == gid && !ref[name])?
						go(name, getNeigbors(name), ref[cur] = cur): res}, []))
			}
			var ref = {},
				 a = links.filter(function(ss){
					return getGroup(ss) == gid
				}).map(function(ss){
					return go(ss, getNeigbors(ss), ref[s] = s)
				})
			return [].concat((a[0]||[]).reverse(), [getInfo(s)], (a[1]||[]))
		}
		var res = {}
		for (s in data) {
			var gid = getGroup(s)
			if (!res[gid]) res[gid] = unwind(s, gid, getNeigbors(s))
		}
		return res
	}
}
