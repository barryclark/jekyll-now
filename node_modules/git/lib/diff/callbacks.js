var ContextChange = require('./change').ContextChange,
  Change = require('./change').Change;

// This callback object implements the default set of callback events, which
// only returns the event itself. Note that //finished_a and //finished_b are
// not implemented -- I haven't yet figured out where they would be useful.
//
// Note that this is intended to be called as is, e.g.,
DefaultCallbacks = exports.DefaultCallbacks = function() {  
}

// Called when two items match.
DefaultCallbacks.prototype.match = function(event) {
  return event;
}

// Called when the old value is discarded in favour of the new value.
DefaultCallbacks.prototype.discard_a = function(event) {
  return event;
}

// Called when the new value is discarded in favour of the old value.
DefaultCallbacks.prototype.discard_b = function(event) {
  return event;
}

// Called when both the old and new values have changed.
DefaultCallbacks.prototype.change = function(event) {
  return event;
}

// An alias for DefaultCallbacks that is used in Diff::LCS#traverse_sequences.
SequenceCallbacks = exports.SequenceCallbacks = DefaultCallbacks;
// An alias for DefaultCallbacks that is used in Diff::LCS#traverse_balanced.
BalancedCallbacks = exports.BalancedCallbacks = DefaultCallbacks;

// This will produce a compound array of simple diff change objects. Each
// element in the //diffs array is a +hunk+ or +hunk+ array, where each
// element in each +hunk+ array is a single Change object representing the
// addition or removal of a single element from one of the two tested
// sequences. The +hunk+ provides the full context for the changes.
//
//     diffs = Diff::LCS.diff(seq1, seq2)
//       // This example shows a simplified array format.
//       // [ [ [ '-',  0, 'a' ] ],   // 1
//       //   [ [ '+',  2, 'd' ] ],   // 2
//       //   [ [ '-',  4, 'h' ],     // 3
//       //     [ '+',  4, 'f' ] ],
//       //   [ [ '+',  6, 'k' ] ],   // 4
//       //   [ [ '-',  8, 'n' ],     // 5
//       //     [ '-',  9, 'p' ],
//       //     [ '+',  9, 'r' ],
//       //     [ '+', 10, 's' ],
//       //     [ '+', 11, 't' ] ] ]
//
// There are five hunks here. The first hunk says that the +a+ at position 0
// of the first sequence should be deleted (<tt>'-'</tt>). The second hunk
// says that the +d+ at position 2 of the second sequence should be inserted
// (<tt>'+'</tt>). The third hunk says that the +h+ at position 4 of the
// first sequence should be removed and replaced with the +f+ from position 4
// of the second sequence. The other two hunks are described similarly.
//
// === Use
// This callback object must be initialised and is used by the Diff::LCS//diff
// method.
//
//     cbo = Diff::LCS::DiffCallbacks.new
//     Diff::LCS.LCS(seq1, seq2, cbo)
//     cbo.finish
//
// Note that the call to //finish is absolutely necessary, or the last set of
// changes will not be visible. Alternatively, can be used as:
//
//     cbo = Diff::LCS::DiffCallbacks.new { |tcbo| Diff::LCS.LCS(seq1, seq2, tcbo) }
//
// The necessary //finish call will be made.
//
// === Simplified Array Format
// The simplified array format used in the example above can be obtained
// with:
//
//     require 'pp'
//     pp diffs.map { |e| e.map { |f| f.to_a } }
DiffCallbacks = exports.DiffCallbacks = function(block) {
  this.hunk = [];
  this.diffs = [];
  
  if(block != null)  {
    block(this);
    this.finish();
  }
}

// Finalizes the diff process. If an unprocessed hunk still exists, then it
// is appended to the diff list.
DiffCallbacks.prototype.finish = function() {
  add_nonempty_hunk(this);
}

DiffCallbacks.prototype.match = function(event) {
  add_nonempty_hunk(this);
}

DiffCallbacks.prototype.discard_a = function(event) {
  this.hunk.push(new Change('-', event.old_position, event.old_element));
}

DiffCallbacks.prototype.discard_b = function(event) {
  this.hunk.push(new Change('+', event.new_position, event.new_element));
}

var add_nonempty_hunk = function(diff_callback) {
  if(diff_callback.hunk.length > 0) diff_callback.diffs.push(diff_callback.hunk);
  diff_callback.hunk = [];
}

// This will produce a simple array of diff change objects. Each element in
// the //diffs array is a single ContextChange. In the set of //diffs provided
// by SDiffCallbacks, both old and new objects will be presented for both
// changed <strong>and unchanged</strong> objects. +nil+ will be substituted
// for a discarded object.
//
// The diffset produced by this callback, when provided to Diff::LCS//sdiff,
// will compute and display the necessary components to show two sequences
// and their minimized differences side by side, just like the Unix utility
// +sdiff+.
// 
//     same             same
//     before     |     after
//     old        <     -
//     -          >     new
//
//     seq1 = %w(a b c e h j l m n p)
//     seq2 = %w(b c d e f j k l m r s t)
//
//     diffs = Diff::LCS.sdiff(seq1, seq2)
//       // This example shows a simplified array format.
//       // [ [ "-", [  0, "a"], [  0, nil ] ],
//       //   [ "=", [  1, "b"], [  0, "b" ] ],
//       //   [ "=", [  2, "c"], [  1, "c" ] ],
//       //   [ "+", [  3, nil], [  2, "d" ] ],
//       //   [ "=", [  3, "e"], [  3, "e" ] ],
//       //   [ "!", [  4, "h"], [  4, "f" ] ],
//       //   [ "=", [  5, "j"], [  5, "j" ] ],
//       //   [ "+", [  6, nil], [  6, "k" ] ],
//       //   [ "=", [  6, "l"], [  7, "l" ] ],
//       //   [ "=", [  7, "m"], [  8, "m" ] ],
//       //   [ "!", [  8, "n"], [  9, "r" ] ],
//       //   [ "!", [  9, "p"], [ 10, "s" ] ],
//       //   [ "+", [ 10, nil], [ 11, "t" ] ] ]
//
// The result of this operation is similar to that of
// Diff::LCS::ContextDiffCallbacks. They may be compared as:
//
//     s = Diff::LCS.sdiff(seq1, seq2).reject { |e| e.action == "=" }
//     c = Diff::LCS.sdiff(seq1, seq2, Diff::LCS::ContextDiffCallbacks).flatten
//
//     s == c // -> true
//
// === Use
// This callback object must be initialised and is used by the Diff::LCS//sdiff
// method.
//
//     cbo = Diff::LCS::SDiffCallbacks.new
//     Diff::LCS.LCS(seq1, seq2, cbo)
//
// As with the other initialisable callback objects, Diff::LCS::SDiffCallbacks
// can be initialised with a block. As there is no "fininishing" to be done,
// this has no effect on the state of the object.
//
//     cbo = Diff::LCS::SDiffCallbacks.new { |tcbo| Diff::LCS.LCS(seq1, seq2, tcbo) }
//
// === Simplified Array Format
// The simplified array format used in the example above can be obtained
// with:
//
//     require 'pp'
//     pp diffs.map { |e| e.to_a }
SDiffCallbacks = exports.SDiffCallbacks = function(block) {
  this.diffs = [];
  
  if(block != null)  {
    block(this);
    this.finish();
  }
}

SDiffCallbacks.prototype.match = function(event) {
  this.diffs.push(ContextChange.simplify(event));
}

SDiffCallbacks.prototype.discard_a = function(event) {
  this.diffs.push(ContextChange.simplify(event));
}

SDiffCallbacks.prototype.discard_b = function(event) {
  this.diffs.push(ContextChange.simplify(event));
}

SDiffCallbacks.prototype.change = function(event) {
  this.diffs.push(ContextChange.simplify(event));
}

// This will produce a compound array of contextual diff change objects. Each
// element in the //diffs array is a "hunk" array, where each element in each
// "hunk" array is a single change. Each change is a Diff::LCS::ContextChange
// that contains both the old index and new index values for the change. The
// "hunk" provides the full context for the changes. Both old and new objects
// will be presented for changed objects. +nil+ will be substituted for a
// discarded object.
//
//     seq1 = %w(a b c e h j l m n p)
//     seq2 = %w(b c d e f j k l m r s t)
//
//     diffs = Diff::LCS.diff(seq1, seq2, Diff::LCS::ContextDiffCallbacks)
//       // This example shows a simplified array format.
//       // [ [ [ '-', [  0, 'a' ], [  0, nil ] ] ],   // 1
//       //   [ [ '+', [  3, nil ], [  2, 'd' ] ] ],   // 2
//       //   [ [ '-', [  4, 'h' ], [  4, nil ] ],     // 3
//       //     [ '+', [  5, nil ], [  4, 'f' ] ] ],
//       //   [ [ '+', [  6, nil ], [  6, 'k' ] ] ],   // 4
//       //   [ [ '-', [  8, 'n' ], [  9, nil ] ],     // 5
//       //     [ '+', [  9, nil ], [  9, 'r' ] ],
//       //     [ '-', [  9, 'p' ], [ 10, nil ] ],
//       //     [ '+', [ 10, nil ], [ 10, 's' ] ],
//       //     [ '+', [ 10, nil ], [ 11, 't' ] ] ] ]
//
// The five hunks shown are comprised of individual changes; if there is a
// related set of changes, they are still shown individually.
//
// This callback can also be used with Diff::LCS//sdiff, which will produce
// results like:
//
//     diffs = Diff::LCS.sdiff(seq1, seq2, Diff::LCS::ContextCallbacks)
//       // This example shows a simplified array format.
//       // [ [ [ "-", [  0, "a" ], [  0, nil ] ] ],  // 1
//       //   [ [ "+", [  3, nil ], [  2, "d" ] ] ],  // 2
//       //   [ [ "!", [  4, "h" ], [  4, "f" ] ] ],  // 3
//       //   [ [ "+", [  6, nil ], [  6, "k" ] ] ],  // 4
//       //   [ [ "!", [  8, "n" ], [  9, "r" ] ],    // 5
//       //     [ "!", [  9, "p" ], [ 10, "s" ] ],
//       //     [ "+", [ 10, nil ], [ 11, "t" ] ] ] ]
//
// The five hunks are still present, but are significantly shorter in total
// presentation, because changed items are shown as changes ("!") instead of
// potentially "mismatched" pairs of additions and deletions.
//
// The result of this operation is similar to that of
// Diff::LCS::SDiffCallbacks. They may be compared as:
//
//     s = Diff::LCS.sdiff(seq1, seq2).reject { |e| e.action == "=" }
//     c = Diff::LCS.sdiff(seq1, seq2, Diff::LCS::ContextDiffCallbacks).flatten
//
//     s == c // -> true
//
// === Use
// This callback object must be initialised and can be used by the
// Diff::LCS//diff or Diff::LCS//sdiff methods.
//
//     cbo = Diff::LCS::ContextDiffCallbacks.new
//     Diff::LCS.LCS(seq1, seq2, cbo)
//     cbo.finish
//
// Note that the call to //finish is absolutely necessary, or the last set of
// changes will not be visible. Alternatively, can be used as:
//
//     cbo = Diff::LCS::ContextDiffCallbacks.new { |tcbo| Diff::LCS.LCS(seq1, seq2, tcbo) }
//
// The necessary //finish call will be made.
//
// === Simplified Array Format
// The simplified array format used in the example above can be obtained
// with:
//
//     require 'pp'
//     pp diffs.map { |e| e.map { |f| f.to_a } }
ContextDiffCallbacks = exports.ContextDiffCallbacks = function(block) {
  this.hunk = [];
  this.diffs = [];
  
  if(block != null)  {
    block(this);
    this.finish();
  }
}

ContextDiffCallbacks.prototype.finish = function() {
  add_nonempty_hunk(this);
}

ContextDiffCallbacks.prototype.discard_a = function(event) {
  this.hunk.push(ContextChange.simplify(event));
}

ContextDiffCallbacks.prototype.discard_b = function(event) {
  this.hunk.push(ContextChange.simplify(event));
}

ContextDiffCallbacks.prototype.match = function(event) {
  this.hunk.push(ContextChange.simplify(event));
}










