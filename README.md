###A\* demonstration

This program demonstrates optimal path finding algorithm that is used in Google
maps, etc. Though the algorithm is very simple, it is blazingly fast and
requires no pre-computation on the nodes. 

Demonstration finds and represents graphically the shortest path between two
stations of Moscow Subway. Moscow subway has 12 lines and 199 stations in
total, 73 of which offer transitions to other lines, and 23 of those allow
transitions between three or more lines. For every destination there exist
hundreds of possible routes, several of which look near optimal; therefore it
is often not obvious which route is the shortest one. That transition time and
distance between stations vary, adds to the problem.  

Entire program, including the user interface and all graphics, fits into 400
lines of code. In particular, my implementation of  A\* is under 25 lines of
code which is, ironically, almost two times shorter than the [pseudocode
definition of A\* on
Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode).

You can watch this program in action on [my
site](https://nosovicki.azurewebsites.net/apps/metro/). Its UI is in Russian,
but it is minimalistic, so here's its exhaustive translation:

* Moscow Metro Map. 
* Show a line. 
* Close

Select any two different stations from dropboxes and press Submit -- The
status report will say: The shortest route between stations X and Y takes X min
: X sec (X transitions). Algorithm worked X seconds and had explored X
variants.
