Search: Node/Express/ElasticSearch
==================================

A service that accepts JSON documents as data, and then provides an interface to search
and give aggregated results on the data.

For example, the caller sends JSON documents that look like

<code>
    {'favoriteBeer': 'Heineken', 'name': 'John Smith', 'numCommits': 200, 'os': 'Mac OS X', 'programmingLanguage': 'Go’}
</code>

and would like to subsequently find out information about engineer trends.

What are the most common `programming languages`?
How about `programming languages` where engineers hack on `Macs`?
And what kinds of `beer` do `Go` developers drink?

The service provides an HTTP endpoint and accept and return JSON to any requests.