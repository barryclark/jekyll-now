var Blob = require('./blob').Blob;

var Diff = exports.Diff = function(repo, a_path, b_path, a_blob, b_blob, a_mode, b_mode, new_file, deleted_file, diff) {
  var _repo = repo, _a_path = a_path, _b_path = b_path
  var _a_mode = a_mode, _b_mode = b_mode, _diff = diff;
  // Create blob objects
  var _a_blob = !a_blob || a_blob.match(/^0{40}$/) ? null : new Blob(repo, a_blob);
  var _b_blob = !b_blob || b_blob.match(/^0{40}$/) ? null : new Blob(repo, b_blob);
  // Chec if we have a new_file/deleted_file
  var _new_file = new_file || _a_blob == null;
  var _deleted_file = deleted_file || _b_blob == null;

  Object.defineProperty(this, "repo", { get: function() { return _repo; }, enumerable: true});
  Object.defineProperty(this, "a_path", { get: function() { return _a_path; }, enumerable: true});
  Object.defineProperty(this, "b_path", { get: function() { return _b_path; }, enumerable: true});
  Object.defineProperty(this, "a_mode", { get: function() { return _a_mode; }, enumerable: true});
  Object.defineProperty(this, "b_mode", { get: function() { return _b_mode; }, enumerable: true});
  Object.defineProperty(this, "diff", { get: function() { return _diff; }, enumerable: true});
  Object.defineProperty(this, "a_blob", { get: function() { return _a_blob; }, enumerable: true});
  Object.defineProperty(this, "b_blob", { get: function() { return _b_blob; }, enumerable: true});
  Object.defineProperty(this, "new_file", { get: function() { return _new_file; }, enumerable: true});
  Object.defineProperty(this, "deleted_file", { get: function() { return _deleted_file; }, enumerable: true});
}

// Create a list of diffs from a diff text
Diff.list_from_string = function(repo, text, callback) {
  // Ensure we don't have white space at the end
  text = text.trim();
  // Split the text into lines
  var lines = text.split("\n");
  var diffs = [];
  var a_path, b_path, a_mode, b_mode, new_file = false, deleted_file = false;
  var a_blob, b_blob;

  while(text.length > 0 && lines.length > 0) {
    // Extract a line
    var parts = lines.shift().match(/^diff --git a\/(.+?) b\/(.+)$/);
    // Unpack parts
    var a_path = parts[1];
    var b_path = parts[2];

    if(lines[0].match(/^old mode/)) {
      a_mode = lines.shift().match(/^old mode (\d+)/)[1]
      b_mode = lines.shift().match(/^new mode (\d+)/)[1]
    }

    if(lines.length == 0 || lines[0].match(/^diff --git/)) {
      diffs.push(new Diff(repo, a_path, b_path, null, null, a_mode, b_mode, false, false, null));
    } else {
      if(lines[0].match(/^new file/)) {
        b_mode = lines.shift().match(/^new file mode (.+)$/)[1];
        a_mode = null;
        new_file = true;
      } else if(lines[0].match(/^deleted file/)) {
        a_mode = lines.shift().match(/^deleted file mode (.+)$/)[1];
        b_mode = null;
        deleted_file = true;
      }
      // Unpack index reference
      parts = lines.shift().match(/^index ([0-9A-Fa-f]+)\.\.([0-9A-Fa-f]+) ?(.+)?$/);
      a_blob = parts[1];
      b_blob = parts[2];
      b_mode = parts[3];

      // Contains all the diff lines
      var diff_lines = [];
      // Fetch all the diff lines
      while(lines.length > 0 && !lines[0].match(/^diff/)) {
        diff_lines.push(lines.shift());
      }

      // Join the difflines
      var diff = diff_lines.join("\n");
      // Add the diff to the list
      diffs.push(new Diff(repo, a_path, b_path, a_blob, b_blob, a_mode, b_mode, new_file, deleted_file, diff));
    }
  }

  // Return the list of diffs
  callback(null, diffs);
}

