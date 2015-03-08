!function() {

  var Nodes = function (nodes, _) {
    this.nodes = nodes;
    this._ = _;
  };

  Nodes.prototype.log = function() {
    console.log('called log');
  };

  Nodes.prototype.d3_connections = function() {
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

  Nodes.prototype.d3_ranked_nodes = function() {
    var _     = this._;
    var nodes = this.nodes;

    var size = 1;
    var keys = _.keys(nodes);

    return  _.map(nodes, function(val, key) {
      size = ranking[ _.indexOf(keys, node) ] * 100

      size = pageRankSize(key, nodes, ranking)
      return { "name": key, "size": 1 };
    });
  }

  Nodes.prototype.d3_nodes = function() {
    var _     = this._;
    var nodes = this.nodes;

    return  _.map(nodes, function(val, key) {
      return { "name": key, "size": 1 };
    });
  }

  Nodes.prototype.matrix = function() {
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

  this.Nodes = Nodes
}();




// Nodes.prototype.build_nodes = function(size_it, ranking) {
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
