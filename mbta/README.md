Gabriella Bova
COMP 20: Web Programming
Assignment 2: Closest MBTA Station

- What has been implemented correctly -
The site connects to the GoogleMaps API and Ming's MBTA API.
The correct stations, user location, times, and distances are displayed.
Only trips with positive, non-zero trip times are displayed.
The icon for the user's location drops onto the screen.

Only one XMLHttpRequest is made, which makes things quicker, because I
don't have to send multiple requests, handle multiple errors, and parse
a JSON on every click.


- What has not been implemented correctly -
I do not periodically update the information on the site. Because of
my decision to only make one XMLHttpRequest, the information about the
trains becomes outdated within minutes, until the user forces the page
to refresh.

The times in the infoWindow of each page are not in ant order. It would
be more logical to show them in order of increasing time. In addition,
these lists are crowded. It would be better if I had included some
priority for the trips; for example, only show the next four coming in
or only show those coming in the next 15 minutes.

The paths from one station to another and from the user's location to
the nearest station are not realistic. They are shortest distance paths
but, in reality, would not be walkable.

The error message is unprofessional and sometimes appears multiple times,
because the method to create the XMLHttpRequest and check the data it
returns is called multiple times after errors.



- Collaboration -
I discusses the examples from class and on GitHub with Johnny Fairfield-Sonn


- Hours completing the assignment -
15 hours