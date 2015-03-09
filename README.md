## Page rank demo

Hope to be able to demo the google page rank algorithim implemented in javascript.

This will be a simple demo.

## Talking points

### History
* Back in 1998
 * "search engines" were just directories
 * human currated
 * missing information
 * non authoritative
* Missing the ability to search
* Have ranked by authority

* Page and Brin noticed that Citation noting was a way to define authority
* How would this work on the web
* Not just a simple matter of counting links to a page
 * must also consider the "authority" of those pages which link to this page
 * this is because of "spam"
 * example:
  * Car insurance companys listed on a link farm
  * Insurance company "Bobs insurance" is linked to from "Jims cars" car sales site
  * "Jims cars" is linked to from a number of forums
  * Bobs insurance would have a higher "authority" because of Jims cars being considered "authoritative"

* have to take into consideration "link pools" (dead ends)
 * dealt with by giving all sites a 'damping value' which is the kind of like a random surfer who clicks around
* simple algorithm
 * PR(A) = (1-d) + d * (PR(T1) / C(T1) + ... + PR(Tn) / C(Tn))


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

The page rank algorithm has been implemented in the `lib/pagerank.js` file.  Most of the implementation logic has been grabbed from an archived copy of this [page](http://williamcotton.com/pagerank-explained-with-javascript) and follows what is described in the original [PageRank paper](http://ilpubs.stanford.edu:8090/422/1/1999-66.pdf) as described in section 2.4.

## Interesting points

* eigenvector:
 A vector of a matrix which when multiplied to said matrix yeilds a vector pointing in the same dirction as the origin vector
* eigenvalue:
 The difference in size of this resulting vector to the original
* adjacency matrix
 A way of represeting a dirctionally linked network in a matrix
* damping factor
 The factor by which all nodes probablity of being reached in increased.  It is used to ensure that a link hole is not reached and that all pages are reached. If the damping factor is .85 (as it was originally set) the there is a 15% chance to not follow any links of the current page and instead go to visit a random page (node).
