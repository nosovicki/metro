###A\* demonstration

This program demonstrates optimal path finding algorithm that is used in
Google maps, etc. Though the algorithm is very simple, it neither involves
hard run-time computation nor requires any pre-computation on the nodes. 

Demonstration finds and represents graphically the shortest path between two
stations in Moscow Subway. Moscow subway has 12 lines and 199 stations in
total, 73 of which are transitional, and 23 allow transitions to several
different lines. Transition time and distance between stations vary, which
adds to the problem.  Therefore it is often not obvious which route is the
shortest one.

Entire program, including the user interface and all graphics, fits into 400
lines of code. In particular, my reference implementation of  A\* is,
ironically, almost two times shorter than the [pseudocode
definition](https://en.wikipedia.org/wiki/A*_search_algorithm) of A\* on
Wikipedia.

You can watch it in action on [my
site](https://nosovicki.azurewebsites.net/apps/metro/) UI is in Russian. The
status report says: The shortest route between stations X and Y takes X min : X
sec (X transitions). Algorithm worked X seconds and had explored X variants.
