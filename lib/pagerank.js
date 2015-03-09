Matrix.prototype.row_stochastic = function(damping_value) {
  var row_length = this.elements[ 0 ].length;
  var d          = ( 1 - damping_value ) / row_length;
  var row_total  = [];

  for (var x = 0; x < row_length; x++) {
    row_total.push( 0 );
    for (y = 0; y < row_length; y++) {
      row_total[ x ] += this.elements[ x ][ y ];
    }
  }

  // var a1 = this.elements.clone();
  var a1 = this.dup().elements;

  for (var x = 0; x < row_length; x++) {
    for (var y = 0; y < row_length; y++) {

      if ( row_total[ x ] > 0 ) {
        a1[ x ][ y ] = a1[ x ][ y ]/row_total[ x ] + d;
      } else {
        a1[ x ][ y ] = (1/row_length) + d;
      }

    }
  }
  return Matrix.create(a1);
}

Vector.prototype.normalize = function() {
  var row_length = this.elements.length;
  var t          = 0;

  for (var i = 0; i < row_length; i++) {
    t += this.elements[ i ];
  }
  return this.multiply( 1.0/t );
}

Matrix.prototype.eigenvector = function() {
  var row_length = this.elements[ 0 ].length;
  var a          = [];

  for (var i = 0; i < row_length; i++) {
    a.push(1);
  }

  var vector = Vector.create( a ).normalize();
  var c_old = 0;

  // repeat for the max number of interations, or until convergence
  var max        = 1000;
  var tolerance  = 0.00001;

  for (var i = 0; i < max; i++) {
    var c_new      = vector.elements[ 0 ];
    var difference = c_new - c_old;
    if ( Math.abs( difference ) < tolerance ) {
      console.log('breanking at convergence!!!!')
      break;
    }

    vector = this.multiply( vector ).normalize();
    c_old  = c_new;
  }
  return vector;
}


Matrix.prototype.pagerank = function( damping_value ) {
  var row_stochastic_matrix  = this.row_stochastic( damping_value );
  var transposed_matrix      = row_stochastic_matrix.transpose();
  var eigenvector            = transposed_matrix.eigenvector();
  var normalized_eigenvector = eigenvector.normalize();
  return normalized_eigenvector.elements;
}


!function() {

  var PageRank = function ( _ ) {
    this._ = _;
  };

  PageRank.prototype.rank_with_matrix = function( matrix, damping_value ) {
    return matrix.pagerank( damping_value )
  }

  PageRank.prototype.rank = function( graph, damping_value ) {
    var _ = this._;

    var nodes = graph.nodes();
    var size  = nodes.length;

    // the value to store in all nodes which are unreachable via edges
    var min_value = ( 1.0 - damping_value ) / size;

    // set up the hash of pagerank values to be normalised  (note could be a Vector)
    var rankings = {};
    _.each( nodes, function( node ) {
      rankings[ node ] = 1.0 / size;
    });

    // repeat for the max number of interations, or until convergence
    var max        = 1000;
    var tolerance  = 0.000001;

    for ( var i = 0; i < max; ++i ) {
      var difference = 0; //will store the total difference in all rankings

      // for each node in the graph
      for ( var j = 0; j < size; ++j ) {

        var current_node = nodes[ j ];

        // the sum of the linking nodes
        var linking_ranks = 0.0;

        // loop over each node which links to this one
        var linking_nodes = graph.linking_nodes( current_node );
        for ( var k = 0; k < linking_nodes.length; ++k ) {
          var linking_node = linking_nodes[ k ];

          // adding ranking from all linking nodes
          linking_ranks += ( rankings[ linking_node ] / graph.linked_nodes( linking_node ).length );
        }

        //PR(A) = (1-d) + d * (PR(T1) / C(T1) + ... + PR(Tn) / C(Tn))
        var rank = min_value + ( damping_value * linking_ranks )
        difference += Math.abs( rankings[ current_node ] - rank )
        rankings[ current_node ] = rank;

      }
      if ( difference < tolerance ){
        console.log('breanking at convergence!!!!')
        break;
      }
    }
    var rankings_array = _.values(rankings);

    var total = _.reduce(rankings_array, function(memo, num){ return memo + num; }, 0)
    var n_factor = 1.0 / total;
    rankings_array = _.map(rankings_array, function( num ) {
      return num * n_factor;
    });

    return rankings_array
  }

  this.PageRank = PageRank
}();
