/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //create a empty board
  var solution = new Board({n: n});
  //choose a start point
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);
      if (!solution.hasAnyRooksConflicts()) {
        //jump out the inner loop
        break;
      } else {
        //remove the rook at (i,j)
        solution.togglePiece(i, j);
      }
    }
  }


  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var helper = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        helper(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  helper(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  //choose a start point
  var helper = function(row) {
    if (row === n) {
      return true;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        if (helper(row + 1)) {
          return true;
        }
      }
      board.togglePiece(row, i);
    }
    return false;
  };

  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     solution.togglePiece(i, j);
  //     if (!solution.hasAnyQueensConflicts()) {
  //       //jump out the inner loop
  //       break;
  //     } else {
  //       //remove the rook at (i,j)
  //       solution.togglePiece(i, j);
  //       //if we can't find a place to put a queen in this line,we need to back to the pre line
  //       if (j === n) {

  //       }
  //     }
  //   }
  // }

  helper(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var helper = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts() && board.rows()[row].indexOf(1) !== -1) {
        helper(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  helper(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
