var util = require('util'),
  SequenceCallbacks = require('./callbacks').SequenceCallbacks,
  ContextChange = require('./change').ContextChange,
  Change = require('./change').Change,
  DiffCallbacks = require('./callbacks').DiffCallbacks,
  SDiffCallbacks = require('./callbacks').SDiffCallbacks,
  BalancedCallbacks = require('./callbacks').BalancedCallbacks,
  ContextDiffCallbacks = require('./callbacks').ContextDiffCallbacks,
  Hunk = require('./hunk').Hunk;

var Difference = exports.Difference = function() {  
}

Difference.LCS = function() {  
}

// Scope the Sequence Callbacks class
Difference.LCS.SequenceCallbacks = SequenceCallbacks;
Difference.LCS.ContextChange = ContextChange;
Difference.LCS.DiffCallbacks = DiffCallbacks;
Difference.LCS.SDiffCallbacks = SDiffCallbacks;
Difference.LCS.BalancedCallbacks = BalancedCallbacks;
Difference.LCS.ContextDiffCallbacks = ContextDiffCallbacks;
Difference.LCS.Change = Change;
Difference.LCS.Hunk = Hunk;

// Diff::LCS.sdiff computes all necessary components to show two sequences
// and their minimized differences side by side, just like the Unix
// utility <em>sdiff</em> does:
//
//     old        <     -
//     same             same
//     before     |     after
//     -          >     new
//
// See Diff::LCS::SDiffCallbacks for the default behaviour. An alternate
// behaviour may be implemented with Diff::LCS::ContextDiffCallbacks. If
// a Class argument is provided for +callbacks+, //diff will attempt to
// initialise it. If the +callbacks+ object (possibly initialised)
// responds to //finish, it will be called.
Difference.LCS.sdiff = function(seq1, seq2, callbacks, block) {
  callbacks = callbacks != null ? callbacks : Difference.LCS.SDiffCallbacks;
  
  if(Object.prototype.toString.call(callbacks) == "[object Function]") {
    callbacks = new callbacks();
  }
  
  // Traverse the sequence
  Difference.LCS.traverse_balanced(seq1, seq2, callbacks);  
  if(callbacks.finish != null) callbacks.finish();
  
  if(block != null) {    
    var res = callbacks.diffs.map(function(hunk) {
      if(Array.isArray(hunk)) {
        hunk = hunk.map(function(v) { return block(v); });
      } else {
        block(hunk);
      }
    });
    
    return res;
  } else {    
    return callbacks.diffs;
  }  
}

// Diff::LCS.diff computes the smallest set of additions and deletions
// necessary to turn the first sequence into the second, and returns a
// description of these changes.
// 
// See Diff::LCS::DiffCallbacks for the default behaviour. An alternate
// behaviour may be implemented with Diff::LCS::ContextDiffCallbacks.
// If a Class argument is provided for +callbacks+, //diff will attempt
// to initialise it. If the +callbacks+ object (possibly initialised)
// responds to //finish, it will be called.
Difference.LCS.diff = function(seq1, seq2, callbacks, block) {
  callbacks = callbacks != null ? callbacks : Difference.LCS.DiffCallbacks;
  
  if(Object.prototype.toString.call(callbacks) == "[object Function]") {
    callbacks = new callbacks();
  }
  
  // Traverse the sequence
  Difference.LCS.traverse_sequences(seq1, seq2, callbacks);  
  if(callbacks.finish != null) callbacks.finish();
  
  if(block != null) {    
    var res = callbacks.diffs.map(function(hunk) {
      if(Array.isArray(hunk)) {
        hunk = hunk.map(function(v) { return block(v); });
      } else {
        block(hunk);
      }
    });
    
    return res;
  } else {    
    return callbacks.diffs;
  }
}


// Diff::LCS.traverse_sequences is the most general facility provided by this
// module; +diff+ and +LCS+ are implemented as calls to it.
//
// The arguments to //traverse_sequences are the two sequences to
// traverse, and a callback object, like this:
//
//   traverse_sequences(seq1, seq2, Diff::LCS::ContextDiffCallbacks.new)
//
// //diff is implemented with //traverse_sequences.
//
// == Callback Methods
// Optional callback methods are <em>emphasized</em>.
//
// callbacks//match::               Called when +a+ and +b+ are pointing
//                                 to common elements in +A+ and +B+.
// callbacks//discard_a::           Called when +a+ is pointing to an
//                                 element not in +B+.
// callbacks//discard_b::           Called when +b+ is pointing to an
//                                 element not in +A+.
// <em>callbacks//finished_a</em>:: Called when +a+ has reached the end of
//                                 sequence +A+.
// <em>callbacks//finished_b</em>:: Called when +b+ has reached the end of
//                                 sequence +B+.
//
// == Algorithm
//       a---+
//           v
//       A = a b c e h j l m n p
//       B = b c d e f j k l m r s t
//           ^
//       b---+
//
// If there are two arrows (+a+ and +b+) pointing to elements of
// sequences +A+ and +B+, the arrows will initially point to the first
// elements of their respective sequences. //traverse_sequences will
// advance the arrows through the sequences one element at a time,
// calling a method on the user-specified callback object before each
// advance. It will advance the arrows in such a way that if there are
// elements <tt>A[ii]</tt> and <tt>B[jj]</tt> which are both equal and
// part of the longest common subsequence, there will be some moment
// during the execution of //traverse_sequences when arrow +a+ is pointing
// to <tt>A[ii]</tt> and arrow +b+ is pointing to <tt>B[jj]</tt>. When
// this happens, //traverse_sequences will call <tt>callbacks//match</tt>
// and then it will advance both arrows.
//
// Otherwise, one of the arrows is pointing to an element of its sequence
// that is not part of the longest common subsequence.
// //traverse_sequences will advance that arrow and will call
// <tt>callbacks//discard_a</tt> or <tt>callbacks//discard_b</tt>, depending
// on which arrow it advanced. If both arrows point to elements that are
// not part of the longest common subsequence, then //traverse_sequences
// will advance one of them and call the appropriate callback, but it is
// not specified which it will call.
//
// The methods for <tt>callbacks//match</tt>, <tt>callbacks//discard_a</tt>,
// and <tt>callbacks//discard_b</tt> are invoked with an event comprising
// the action ("=", "+", or "-", respectively), the indicies +ii+ and
// +jj+, and the elements <tt>A[ii]</tt> and <tt>B[jj]</tt>. Return
// values are discarded by //traverse_sequences.
//
// === End of Sequences
// If arrow +a+ reaches the end of its sequence before arrow +b+ does,
// //traverse_sequence try to call <tt>callbacks//finished_a</tt> with the
// last index and element of +A+ (<tt>A[-1]</tt>) and the current index
// and element of +B+ (<tt>B[jj]</tt>). If <tt>callbacks//finished_a</tt>
// does not exist, then <tt>callbacks//discard_b</tt> will be called on
// each element of +B+ until the end of the sequence is reached (the call
// will be done with <tt>A[-1]</tt> and <tt>B[jj]</tt> for each element).
//
// If +b+ reaches the end of +B+ before +a+ reaches the end of +A+,
// <tt>callbacks//finished_b</tt> will be called with the current index
// and element of +A+ (<tt>A[ii]</tt>) and the last index and element of
// +B+ (<tt>A[-1]</tt>). Again, if <tt>callbacks//finished_b</tt> does not
// exist on the callback object, then <tt>callbacks//discard_a</tt> will
// be called on each element of +A+ until the end of the sequence is
// reached (<tt>A[ii]</tt> and <tt>B[-1]</tt>).
//
// There is a chance that one additional <tt>callbacks//discard_a</tt> or
// <tt>callbacks//discard_b</tt> will be called after the end of the
// sequence is reached, if +a+ has not yet reached the end of +A+ or +b+
// has not yet reached the end of +B+.
Difference.LCS.traverse_sequences = function(seq1, seq2, callbacks, block) { // The block allows callbacks on change events
  // Ensure that we have at least a default callback object
  callbacks = callbacks != null ? callbacks : new Difference.LCS.SequenceCallbacks();
  // Fetch the matches from the __lcs algorithm
  var matches = Difference.LCS.__lcs(seq1, seq2);
  
  var run_finished_a = false, run_finished_b = false;
  var string = seq1.constructor == String;
  
  var a_size = seq1.length, b_size = seq2.length;
  var ai = 0, bj = 0;
  var event = null;
  
  for(var ii = 0; ii <= matches.length; ii++) {
    var b_line = matches[ii];
    
    var ax = string ? seq1.substr(ii, 1) : seq1[ii];
    var bx = string ? seq2.substr(bj, bj + 1) : seq2[bj];

    if(b_line == null) {
      if(ax != null) {
        event = new Difference.LCS.ContextChange('-', ii, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.discard_a(event);
      }
    } else {
      while(bj < b_line) {
        bx = string ? seq2.substr(bj, 1) : seq2[bj];
        event = new Difference.LCS.ContextChange('+', ii, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.discard_b(event);
        bj = bj + 1;
      }
      
      bx = string ? seq2.substr(bj, 1) : seq2[bj];
      event = new Difference.LCS.ContextChange('=', ii, ax, bj, bx);
      if(block != null) event = block(event);
      callbacks.match(event);
      bj = bj + 1;
    }
    
    // Update the ai with the current index point
    ai = ii;    
  }
  
  // Update pointer
  ai = ai + 1;
  
  // The last entry (if any) processed was a match. +ai+ and +bj+ point
  // just past the last matching lines in their sequences.
  while(ai < a_size || bj < b_size) {
    // last A
    if(ai == a_size && bj < b_size) {
      if(callbacks.finished_a != null && !run_finished_a) {
        ax = string ? seq1.substr(seq1.length - 1, 1) : seq1[seq1.length - 1];
        bx = string ? seq2.substr(bj, 1) : seq2[bj];
        event = new Difference.LCS.ContextChange('>', (a_size - 1), ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.finished_a(event);
        run_finished_a = true;
      } else {        
        ax = string ? seq1.substr(ai, 1) : seq1[ai];
        do {
          bx = string ? seq2.substr(bj, 1) : seq2[bj];
          event = new Difference.LCS.ContextChange('+', ai, ax, bj, bx);
          if(block != null) event = block(event);
          callbacks.discard_b(event);
          bj = bj + 1;          
        } while(bj < b_size)
      }
    }
    
    // last B?
    if(bj == b_size && ai < a_size) {
      if(callbacks.finished_b != null && !run_finished_b) {
        ax = string ? seq1.substr(ai, 1) : seq1[ai];
        bx = string ? seq2.substr(seq2.length - 1, 1) : seq2[seq2.length - 1];
        event = new Difference.LCS.ContextChange('<', ai, ax, (b_size -1), bx);
        if(block != null) event = block(event);
        callbacks.finished_b(event);
        run_finished_b = true;
      } else {
        bx = string ? seq2.substr(bj, 1) : seq2[bj];
        do {
          ax = string ? seq1.substr(ai, 1) : seq1[ai];
          event = new Difference.LCS.ContextChange('-', ai, ax, bj, bx);
          if(block != null) event = block(event);
          callbacks.discard_a(event);
          ai = ai + 1;        
        } while(bj < b_size)
      }
    }    
    
    if(ai < a_size) {
      ax = string ? seq1.substr(ai, 1) : seq1[ai];
      bx = string ? seq2.substr(bj, 1) : seq2[bj];
      event = new Difference.LCS.ContextChange('-', ai, ax, bj, bx);
      if(block != null) event = block(event);
      callbacks.discard_a(event);
      ai = ai + 1;
    }

    if(bj < b_size) {
      ax = string ? seq1.substr(ai, 1) : seq1[ai];
      bx = string ? seq2.substr(bj, 1) : seq2[bj];
      event = new Difference.LCS.ContextChange('+', ai, ax, bj, bx);
      if(block != null) event = block(event);
      callbacks.discard_b(event);
      bj = bj + 1;
    }      
  }  
}

// //traverse_balanced is an alternative to //traverse_sequences. It
// uses a different algorithm to iterate through the entries in the
// computed longest common subsequence. Instead of viewing the changes as
// insertions or deletions from one of the sequences, //traverse_balanced
// will report <em>changes</em> between the sequences. To represent a
//
// The arguments to //traverse_balanced are the two sequences to traverse
// and a callback object, like this:
//
//   traverse_balanced(seq1, seq2, Diff::LCS::ContextDiffCallbacks.new)
//
// //sdiff is implemented with //traverse_balanced.
//
// == Callback Methods
// Optional callback methods are <em>emphasized</em>.
//
// callbacks//match::               Called when +a+ and +b+ are pointing
//                                 to common elements in +A+ and +B+.
// callbacks//discard_a::           Called when +a+ is pointing to an
//                                 element not in +B+.
// callbacks//discard_b::           Called when +b+ is pointing to an
//                                 element not in +A+.
// <em>callbacks//change</em>::     Called when +a+ and +b+ are pointing
//                                 to the same relative position, but
//                                 <tt>A[a]</tt> and <tt>B[b]</tt> are
//                                 not the same; a <em>change</em> has
//                                 occurred.
//
// //traverse_balanced might be a bit slower than //traverse_sequences,
// noticable only while processing huge amounts of data.
//
// The +sdiff+ function of this module is implemented as call to
// //traverse_balanced.
//
// == Algorithm
//       a---+
//           v
//       A = a b c e h j l m n p
//       B = b c d e f j k l m r s t
//           ^
//       b---+
//
// === Matches
// If there are two arrows (+a+ and +b+) pointing to elements of
// sequences +A+ and +B+, the arrows will initially point to the first
// elements of their respective sequences. //traverse_sequences will
// advance the arrows through the sequences one element at a time,
// calling a method on the user-specified callback object before each
// advance. It will advance the arrows in such a way that if there are
// elements <tt>A[ii]</tt> and <tt>B[jj]</tt> which are both equal and
// part of the longest common subsequence, there will be some moment
// during the execution of //traverse_sequences when arrow +a+ is pointing
// to <tt>A[ii]</tt> and arrow +b+ is pointing to <tt>B[jj]</tt>. When
// this happens, //traverse_sequences will call <tt>callbacks//match</tt>
// and then it will advance both arrows.
//
// === Discards
// Otherwise, one of the arrows is pointing to an element of its sequence
// that is not part of the longest common subsequence.
// //traverse_sequences will advance that arrow and will call
// <tt>callbacks//discard_a</tt> or <tt>callbacks//discard_b</tt>,
// depending on which arrow it advanced.
//
// === Changes
// If both +a+ and +b+ point to elements that are not part of the longest
// common subsequence, then //traverse_sequences will try to call
// <tt>callbacks//change</tt> and advance both arrows. If
// <tt>callbacks//change</tt> is not implemented, then
// <tt>callbacks//discard_a</tt> and <tt>callbacks//discard_b</tt> will be
// called in turn.
//
// The methods for <tt>callbacks//match</tt>, <tt>callbacks//discard_a</tt>,
// <tt>callbacks//discard_b</tt>, and <tt>callbacks//change</tt> are
// invoked with an event comprising the action ("=", "+", "-", or "!",
// respectively), the indicies +ii+ and +jj+, and the elements
// <tt>A[ii]</tt> and <tt>B[jj]</tt>. Return values are discarded by
// //traverse_balanced.
//
// === Context
// Note that +ii+ and +jj+ may not be the same index position, even if
// +a+ and +b+ are considered to be pointing to matching or changed
// elements.
Difference.LCS.traverse_balanced = function(seq1, seq2, callbacks, block) {
  // Ensure that we have at least a default callback object
  callbacks = callbacks != null ? callbacks : new Difference.LCS.BalancedCallbacks();
  // Fetch the matches from the __lcs algorithm
  var matches = Difference.LCS.__lcs(seq1, seq2);  
  var a_size = seq1.length;
  var b_size = seq2.length;
  var ai = 0, bj = 0;
  var mb = 0;
  var ma = -1;
  var string = seq1.constructor == String;
  var ax = null, bx = null, event = null;
  var execute = true;

  // Process all the lines in the match vector.
  while(true) {
    // Find next match indices +ma+ and +mb+
    while(execute) {
      ma = ma + 1;
      if(!(ma < matches.length && matches[ma] == null)) break;
      // execute = !(ma < matches.length && matches[ma] == null);
    }

    if(ma >= matches.length) break; // end of matches
    mb = matches[ma];

    // Change seq2
    while((ai < ma) || (bj < mb)) {
      ax = string ? seq1.substr(ai, 1) : seq1[ai];
      bx = string ? seq2.substr(bj, 1) : seq2[bj];
      
      // Calculate result
      var result = [(ai < ma), (bj < mb)];
      
      if(result[0] && result[1]) {
        if(callbacks.change != null) {
          event = new Difference.LCS.ContextChange('!', ai, ax, bj, bx);
          if(block != null) event = block(event);
          callbacks.change(event);
          ai = ai + 1;
          bj = bj + 1;
        } else {
          event = new Difference.LCS.ContextChange('-', ai, ax, bj, bx);
          if(block != null) event = block(event);
          callbacks.discard_a(event);
          ai = ai + 1;
          ax = string ? seq1.substr(ai, 1) : seq1[ai];
          event = new Difference.LCS.ContextChange('+', ai, ax, bj, bx);
          if(block != null) event = block(event);
          callbacks.discard_b(event);
          bj = bj + 1
        }
      } else if(result[0] && !result[1]) {
        event = new Difference.LCS.ContextChange('-', ai, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.discard_a(event);
        ai = ai + 1;
      } else if(!result[0] && result[1]) {
        event = new Difference.LCS.ContextChange('+', ai, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.discard_b(event);
        bj = bj + 1;
      }      
    }
    
    // Match
    ax = string ? seq1.substr(ai, 1) : seq1[ai];
    bx = string ? seq2.substr(bj, 1) : seq2[bj];
    event = new Difference.LCS.ContextChange('=', ai, ax, bj, bx);
    if(block != null) event = block(event);
    callbacks.match(event);
    ai = ai + 1;
    bj = bj + 1;    
  }
  
  while((ai < a_size) || (bj < b_size)) {
    ax = string ? seq1.substr(ai, 1) : seq1[ai];
    bx = string ? seq2.substr(bj, 1) : seq2[bj];
    
    var result = [(ai < a_size), (bj < b_size)];
    if(result[0] && result[1]) {
      if(callbacks.change != null) {
        event = new Difference.LCS.ContextChange('!', ai, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.change(event);
        ai = ai + 1;
        bj = bj + 1;
      } else {
        event = new Difference.LCS.ContextChange('-', ai, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.discard_a(event);
        ai = ai + 1;
        ax = string ? seq1.substr(ai, 1) : seq1[ai];
        event = new Difference.LCS.ContextChange('+', ai, ax, bj, bx);
        if(block != null) event = block(event);
        callbacks.discard_b(event);
        bj = bj + 1;        
      }
    } else if(result[0] && !result[1]) {
      event = new Difference.LCS.ContextChange('-', ai, ax, bj, bx);
      if(block != null) event = block(event);
      callbacks.discard_a(event);
      ai = ai + 1;
    } else if(!result[0] && result[1]) {
      event = new Difference.LCS.ContextChange('+', ai, ax, bj, bx);
      if(block != null) event = block(event);
      callbacks.discard_b(event);
      bj = bj + 1;
    }
  }
}

// Given two sequenced Enumerables, LCS returns an Array containing their
// longest common subsequences.
// 
//   lcs = Diff::LCS.LCS(seq1, seq2)
// 
// This array whose contents is such that:
// 
//   lcs.each_with_index do |ee, ii|
//     assert(ee.nil? || (seq1[ii] == seq2[ee]))
//   end
// 
// If a block is provided, the matching subsequences will be yielded from
// +seq1+ in turn and may be modified before they are placed into the
// returned Array of subsequences.
Difference.LCS.LCS = function(seq1, seq2, block) {
  var matches = Difference.LCS.__lcs(seq1, seq2);
  var ret = [];
  
  for(var ii = 0; ii < matches.length; ii++) {
    if(matches[ii] != null) {
      if(block != null) {
        ret.push(block(seq1[ii]));
      } else {
        ret.push(seq1[ii]);
      }
    }
  }
  // Return the result
  return ret;
}

var PATCH_MAP = {
  patch:{ '+':'+', '-':'-', '!':'!', '=':'=' },
  unpatch:{ '+':'-', '-':'+', '!':'!', '=':'=' }
}

// Given a patchset, convert the current version to the new
// version. If +direction+ is not specified (must be
// <tt>:patch</tt> or <tt>:unpatch</tt>), then discovery of the
// direction of the patch will be attempted.
Difference.LCS.patch = function(src, patchset, direction) {
  var string = src.constructor == String;
  // Start with an empty type of the source's class
  var res = string ? '' : [];
  
  // Normalize the patchset
  var patchset = this.__normalize_patchset(patchset);
  var direction = direction || Difference.LCS.__diff_direction(src, patchset);
  direction = direction || "patch";
  
  var ai = 0, bj = 0;
  var el = null, op = null, np = null;
  
  for(var i = 0; i < patchset.length; i++) {
    var change = patchset[i];
    // Both Change and ContextChange has the action
    var action = PATCH_MAP[direction][change.action];
    
    if(change instanceof ContextChange) {
      if(direction == 'patch') {
        el = change.new_element;
        op = change.old_position;
        np = change.new_position;
      } else if(direction == 'unpatch') {
        el = change.old_element;
        op = change.new_position;
        np = change.old_position;
      }
      
      if(action == '-') { //Remove details from the old string
        while(ai < op) {
          string ? res = res + src.substr(ai, 1) : res.push(src[ai]);
          ai = ai + 1;
          bj = bj + 1;
        }        
        ai = ai + 1;
      } else if(action == '+') {
        while(bj < np) {
          string ? res = res + src.substr(ai, 1) : res.push(src[ai]);
          ai = ai + 1;
          bj = bj + 1;
        }
        string ? res = res + el : res.push(el);
        bj = bj + 1;
      } else if(action == '=') {
        // This only appears in sdiff output with the SDiff callback.
        // Therefore, we only need to worry about dealing with a single
        // element.
        string ? res = res + el : res.push(el);
        ai = ai + 1;
        bj = bj + 1;
      } else if(action == '!') {
        while(ai < op) {
          string ? res = res + src.substr(ai, 1) : res.push(src[ai]);
          ai = ai + 1;
          bj = bj + 1;
        }
        bj = bj + 1;
        ai = ai + 1;
        string ? res = res + el : res.push(el);
      }
    } else if(change instanceof Change) {
      if(action == '-') {
        while(ai < change.position) {
          string ? res = res + src.substr(ai, 1) : res.push(src[ai]);
          ai = ai + 1;
          bj = bj + 1;
        }
        ai = ai + 1;
      } else if(action = '+') {
        while(bj < change.position) {
          string ? res = res + src.substr(ai, 1) : res.push(src[ai]);
          ai = ai + 1;
          bj = bj + 1;
        }
        bj = bj + 1;
        string ? res = res + change.element : res.push(change.element);
      }
    }    
  }  
  
  while(ai < src.length) {
    string ? res = res + src.substr(ai, 1) : res.push(src[ai]);
    ai = ai + 1;
    bj = bj + 1;
  }
  
  return res;  
}

// Examine the patchset and the source to see in which direction the
// patch should be applied.
//
// WARNING: By default, this examines the whole patch, so this could take
// some time. This also works better with Diff::LCS::ContextChange or
// Diff::LCS::Change as its source, as an array will cause the creation
// of one of the above.
Difference.LCS.__diff_direction = function(src, patchset, limit) {
  var count = 0, left = 0, left_miss = 0, right = 0, right_miss = 0, element = null;
  var string = src.constructor == String;

  // Process all changes in the patchset
  for(var i = 0; i < patchset.length; i++) {
    var change = patchset[i];
    count = count + 1;
    
    if(change instanceof Change) {
      // With a simplistic change, we can't tell the difference between
      // the left and right on '!' actions, so we ignore those. On '='
      // actions, if there's a miss, we miss both left and right.
      element = string ? src.substr(change.position, 1) : src[change.position];
      
      if(change.action == '-') {
        element == change.element ? left = left + 1 : left_miss = left_miss + 1;
      } else if(change.action == '+') {
        element == change.element ? right = right + 1 : right_miss = right_miss + 1;
      } else if(change.action == '=') {
        if(element != change.element) {
          left_miss = left_miss + 1;
          right_miss = right_miss + 1;
        }
      }      
    } else if(change instanceof ContextChange) {
      if(change.action == '-') {
        element = string ? src.substr(change.old_position, 1) : src[change.old_position];
        element == change.old_element ? left = left + 1 : left_miss = left_miss + 1;        
      } else if(change.action == '+') {
        element = string ? src.substr(change.new_position, 1) : src[change.new_position];
        element == change.new_element ? right = right + 1 : right_miss = right_miss + 1;
      } else if(change.action == '=') {
        var le = string ? src.substr(change.old_position, 1) : src[change.old_position];
        var re = string ? src.substr(change.new_position, 1) : src[change.new_position];
        
        if(le != change.old_element) left_miss = left_miss + 1;
        if(re != change.new_element) right_miss = right_miss + 1;
      } else if(change.action == '!') {
        element = string ? src.substr(change.old_position, 1) : src[change.old_position];
        if(element == change.old_element) {
          left = left + 1;
        } else {
          left_miss = left_miss + 1;
          right_miss = right_miss + 1;
        }
      }
    }
    
    if(limit != null && count > limit) break;
  };
  
  var no_left = (left == 0) && (left_miss >= 0);
  var no_right = (right == 0) && (right_miss >= 0);
  
  var result = [no_left, no_right];
  if(!no_left && no_right) {
    return "patch";
  } else if(no_left && !no_right) {
    return "unpatch";
  } else {
    throw "The provided patchset does not appear to apply to the provided value as either source or destination value."
  }
}

// Normalize the patchset. A patchset is always a sequence of changes, but
// how those changes are represented may vary, depending on how they were
// generated. In all cases we support, we also support the array
// representation of the changes. The formats are:
//
//   [ // patchset <- Diff::LCS.diff(a, b)
//     [ // one or more hunks
//       Diff::LCS::Change // one or more changes
//     ] ]
//
//   [ // patchset, equivalent to the above
//     [ // one or more hunks
//       [ action, line, value ] // one or more changes
//     ] ]
//
//   [ // patchset <- Diff::LCS.diff(a, b, Diff::LCS::ContextDiffCallbacks)
//     //       OR <- Diff::LCS.sdiff(a, b, Diff::LCS::ContextDiffCallbacks)
//     [ // one or more hunks
//       Diff::LCS::ContextChange // one or more changes
//     ] ]
//
//   [ // patchset, equivalent to the above
//     [ // one or more hunks
//       [ action, [ old line, old value ], [ new line, new value ] ]
//         // one or more changes
//     ] ]
//
//   [ // patchset <- Diff::LCS.sdiff(a, b)
//     //       OR <- Diff::LCS.diff(a, b, Diff::LCS::SDiffCallbacks)
//     Diff::LCS::ContextChange // one or more changes
//   ]
//
//   [ // patchset, equivalent to the above
//     [ action, [ old line, old value ], [ new line, new value ] ]
//       // one or more changes
//   ]
//
// The result of this will be either of the following.
//
//   [ // patchset
//     Diff::LCS::ContextChange // one or more changes
//   ]
//
//   [ // patchset
//     Diff::LCS::Change // one or more changes
//   ]
//
// If either of the above is provided, it will be returned as such.
//
Difference.LCS.__normalize_patchset = function(patchset) {
  return flatten(patchset.map(function(hunk) {
    if(hunk instanceof ContextChange || hunk instanceof Change) {
      return hunk;
    } else if(Array.isArray(hunk)) {
      if(!Array.isArray(hunk[0]) && Array.isArray(hunk[1]) && Array.isArray(hunk[2])) {
        return ContextChange.from_a(hunk);
      } else {
        return hunk.map(function(change) {
          if(change instanceof ContextChange || change instanceof Change) {
            return change;
          } else if(Array.isArray(change)) {
            // change[1] will ONLY be an array in a ContextChange#to_a call.
            // In Change#to_a, it represents the line (singular).
            if(Array.isArray(change[1])) {
              return ContextChange.from_a(change);
            } else {
              return Change.from_a(change);
            }
          }
        });
      }      
    } else {
      throw "Cannot normalize the hunk: " + util.inspect(hunk);
    }    
  }));
}

// Gotten from
var flatten = function(array) {
  return array.reduce(function(a,b) {  
    return a.concat(b);  
  }, []);
}

// Compute the longest common subsequence between the arrays a and b the result
// being an array whose content is such that they 
// count = 0
// result.forEach(function(e) {
//  if(e) a[count] == b[e];
//  count++; 
// })
Difference.LCS.__lcs = function(a, b) {
  var a_start = 0;
  var b_start = 0;
  var a_finish = a.length - 1;
  var b_finish = b.length - 1;
  var vector = [];
    
  // Remove common elements at the beginning
  while((a_start <= a_finish) && (b_start <= b_finish) && (a[a_start] == b[b_start])) {
    vector[a_start] = b_start;
    a_start = a_start + 1;
    b_start = b_start + 1;
  }
  
  // Remove common elements at the end
  while((a_start <= a_finish) && (b_start <= b_finish) && (a[a_finish] == b[b_finish])) {
    vector[a_finish] = b_finish;
    a_finish = a_finish - 1;
    b_finish = b_finish - 1;
  }
  
  // Now compute the equivalent classes of positions of elements
  var b_matches = Difference.LCS.__position_hash(b, b_start, b_finish);
  
  // Define treshold and links
  var thresh = [];
  var links = [];
  
  for(var ii = a_start; ii <= a_finish; ii++) {
    var ai = Array.isArray(a) ? a[ii] : a.charAt(ii);
    var bm = b_matches[ai];
    bm = bm ? bm : [];
    var kk = null;
    
    bm.reverse().forEach(function(jj) {
      if(kk != null && (thresh[kk] > jj) && (thresh[kk - 1] < jj)) {
        thresh[kk] = jj;
      } else {
        kk = Difference.LCS.__replace_next_larger(thresh, jj, kk);
      }
      // Add link
      if(kk != null) links[kk] = [(kk > 0) ? links[kk - 1] : null, ii, jj];
    });
  }
    
  // Build the vector
  if(thresh.length > 0) {
    var link = links[thresh.length - 1];
    
    while(link != null) {
      vector[link[1]] = link[2];
      link = link[0];
    }
  }
  
  // Return the vector of the longest commong subsequence
  return vector;
}

// Find the place at which +value+ would normally be inserted into the
// Enumerable. If that place is already occupied by +value+, do nothing
// and return +nil+. If the place does not exist (i.e., it is off the end
// of the Enumerable), add it to the end. Otherwise, replace the element
// at that point with +value+. It is assumed that the Enumerable's values
// are numeric.
//
// This operation preserves the sort order.
Difference.LCS.__replace_next_larger = function(enumerable, value, last_index) {
  // Is it off the end
  if(enumerable.length == 0 || (value > enumerable[enumerable.length - 1])) {
    enumerable.push(value);
    return enumerable.length - 1;
  }
  
  // Binary search for the insertion point
  var last_index = last_index || enumerable.length;
  var first_index = 0;
  
  while(first_index <= last_index) {
    var ii = (first_index + last_index) >> 1;
    var found = enumerable[ii];
    
    if(value == found) {
      return null;
    } else if(value > found) {
      first_index = ii + 1;
    } else {
      last_index = ii - 1;
    }
  }
  
  // The insertion point is in first_index; overwrite the next larger
  // value.
  enumerable[first_index] = value;
  return first_index;
}

Difference.LCS.__position_hash = function(enumerable, interval_start, interval_end) {
  interval_start = interval_start ? interval_start : 0;
  interval_end = interval_end ? interval_end : -1;
  
  var hash = {}
  for(var i = interval_start; i <= interval_end; i++) {
    var kk = Array.isArray(enumerable) ? enumerable[i] : enumerable.charAt(i);
    hash[kk] = Array.isArray(hash[kk]) ? hash[kk] : [];
    hash[kk].push(i);
  }
  return hash;
}