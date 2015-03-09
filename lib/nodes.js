!function() {

  var DirectedGraph = function (nodes, _) {
    this.nodes = nodes;
    this._ = _;
  };

  DirectedGraph.prototype.log = function() {
    console.log('called log');
  };

  DirectedGraph.prototype.d3_connections = function() {
    var _     = this._;
    var nodes = this.nodes;

    var connections = [];
    _.each(nodes, function(targets, source) {
      _.each(targets, function(target){
        connections.push({"source": source, "target": target});
      });
    });

    return connections;
  };

  DirectedGraph.prototype.d3_ranked_nodes = function(ranking) {
    var _     = this._;
    var nodes = this.nodes;

    var size = 1;
    var keys = _.keys(nodes);

    return  _.map(nodes, function(targets, source) {
      size = ranking[ _.indexOf(keys, source) ] * 100
      return { "name": source, "size": size };
    });
  }

  DirectedGraph.prototype.d3_nodes = function() {
    var _     = this._;
    var nodes = this.nodes;

    return  _.map(nodes, function(targets, source) {
      return { "name": source, "size": 1 };
    });
  }

  DirectedGraph.prototype.matrix = function() {
    var _     = this._;
    var nodes = this.nodes;

    var matrix = []
    var vector = []

    _.each(nodes, function(targets, source) {
      vector.push(0);
    });
    _.each(vector, function(element){
      matrix.push(vector.slice(0));
    });


    keys = _.keys(nodes)
    _.each(nodes, function(targets, source) {
      x = _.indexOf(keys, source)
      _.each(targets, function(target){
        y = _.indexOf(keys, target);
        matrix[x][y] = 1;
      });
    });

    return matrix;

  };

  this.DirectedGraph = DirectedGraph
}();




// DirectedGraph.prototype.build_nodes = function(size_it, ranking) {
//   var _     = this._;
//   var nodes = this.nodes;
//
//   var size = min_size;
//   var nodes = _.map(nodes, function(val, key) {
//     if(size_it){
//       size = pageRankSize(key, nodes, ranking)
//     }
//     return { "name": key, "size": size };
//   });
//
//   return nodes;
// }
//
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }
//
// function build_positions(nodes) {
//   var x, y = 0
//   var positions = _.map(nodes, function(val, key) {
//     x = getRandomInt(0, 30)
//     y = getRandomInt(0, 30)
//     return { "name": key, "x": x, "y": y };
//   });
//
//   return positions;
// }
