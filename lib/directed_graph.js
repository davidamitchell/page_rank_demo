!function() {

  var DirectedGraph = function ( nodes_data, _ ) {
    //TODO this should really be turned into an array
    this.nodes_data = nodes_data;
    this._          = _;
  };

  DirectedGraph.prototype.log = function() {
    console.log('called log');
  };

  DirectedGraph.prototype.d3_connections = function() {
    var nodes_data = this.nodes_data;
    var _          = this._;

    var connections = [];
    _.each( nodes_data, function( targets, source ) {
      _.each( targets, function( target ){
        connections.push( { "source": source, "target": target } );
      });
    });

    return connections;
  };

  DirectedGraph.prototype.d3_ranked_nodes = function( rankings ) {
    var nodes_data = this.nodes_data;
    var _          = this._;

    var size = 1;
    var keys = _.keys( nodes_data );

    return  _.map( nodes_data, function( targets, source ) {
      size = rankings[ _.indexOf(keys, source) ] * 100
      return { "name": source, "size": size };
    });
  };

  DirectedGraph.prototype.d3_nodes = function() {
    var nodes_data = this.nodes_data;
    var _          = this._;

    return  _.map( nodes_data, function( targets, source ) {
      return { "name": source, "size": 1 };
    });
  };

  DirectedGraph.prototype.nodes = function() {
    var nodes_data = this.nodes_data;
    var _          = this._;

    return _.keys( nodes_data )
  };

  DirectedGraph.prototype.linking_nodes = function( node ) {
    var nodes_data = this.nodes_data;
    var _          = this._;

    var nodes = [];

    _.each( nodes_data, function( targets, source ) {
      _.each( targets, function( target ){
        if (target == node){
          nodes.push( source );
        }
      });
    });

    return _.uniq( nodes )
  };

  DirectedGraph.prototype.linked_nodes = function( node ) {
    var nodes_data = this.nodes_data;
    var _          = this._;

    return nodes_data[ node ]
  };

  DirectedGraph.prototype.matrix = function( ) {
    var nodes_data = this.nodes_data;
    var _          = this._;

    var matrix = []
    var vector = []

    _.each( nodes_data, function( targets, source ) {
      vector. push(0 );
    });
    _. each(vector, function(element){
       matrix.push(vector.slice(0));
    });


    keys = _.keys( nodes_data )
    _.each( nodes_data, function( targets, source ) {
      x = _.indexOf( keys, source )
       _.each(targets , function(target){
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
//   var nodes_data = this.nodes_data;
//
//   var size = min_size;
//   var nodes_data = _.map(nodes_data, function(val, key) {
//     if(size_it){
//       size = pageRankSize(key, nodes_data, ranking)
//     }
//     return { "name": key, "size": size };
//   });
//
//   return nodes_data;
// }
//
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }
//
// function build_positions( nodes_data ) {
//   var x, y = 0
//   var positions = _.map(nodes_data, function(val, key) {
//     x = getRandomInt(0, 30)
//     y = getRandomInt(0, 30)
//     return { "name": key, "x": x, "y": y };
//   });
//
//   return positions;
// }
