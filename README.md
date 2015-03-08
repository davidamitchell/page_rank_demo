## Page rank demo

Hope to be able to demo the google page rank algorithim implemented in javascript.

This will be a simple demo.


## Setup

This is a fully self contained site, it uses:
* d3, for data visualations, although I am pretty much just drawing circles (http://d3js.org/)
* d3plus, to help with my circles, actually d3plus makes working with d3 for simple things like modeling networks really easy (http://d3plus.org/)
* underscore, just cause i can (http://underscorejs.org/)
* sylvester, to help with linear algebra

## How it works
There is a variable `nodes` in `index.html` which holds the nodes (webpages) in a keyed array (hash).  Each key in the hash is the name of a `node`. Each value is an array of all the other nodes it "links" to.  For example a simple network where `a` links to `b` and `c`, and `c` links to `b` is as follows

```
{
  'a': ['b', 'c'],
  'b': [],
  'c': ['b']
}
```
I have choosen this format as it is easy for me to understand what the resulting graph will look like.  And it is easy to translate a hand drawn graph to this format.  A lot easier then typing out a matrix.

There is a helper class `Nodes` which can represent this hash as a matrix for the required linear algebra and various structures which are required by d3plus to assit in rendering the network.

## Using

To use just represent your graph in the `nodes` variable described above and load the index.html page.  Clicking on any whitespace in the page will show the page ranking of each "site" (node) as a relitive size.

So each node will adjust its size based on its ranking according to the simplified implementation of the page rank algorithm.

## Page ranking

The page rank algorithm has been implemented in the `lib/pagerank.js` file.
