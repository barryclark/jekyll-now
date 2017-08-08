var util = require('util'),
  fs = require('fs'),
  exec  = require('child_process').exec;

var GitFileOperations = exports.GitFileOperations = function() {}

// Streaming glob function
var streaming_glob_function = function(path, stream) {
  var entries = fs.readdirSync(path);
  entries.forEach(function(entry) {
    var entry_path = path + "/" + entry;    
    var stat = fs.statSync(entry_path);
    
    if(stat.isDirectory()) {
      stream.emit("data", {path:entry_path, stat:stat});
      streaming_glob_function(entry_path, stream);
    } else {
      stream.emit("data", {path:entry_path, stat:stat});
    }
  })
}

var stat_with_entry = function(entry_path, stream, callback) {
  return function() {
    fs.stat(entry_path, function(err, stat) {
      if(stat.isDirectory()) {
        // Dive into the directory
        streaming_glob_function(entry_path, stream);
        // Emit the directory and then update the count
        stream.emit("data", {path:entry_path, stat:stat});
        callback();
      } else if(stat.isFile()) {
        // Update the number of processed directories and emit the data event
        stream.emit("data", {path:entry_path, stat:stat});
        callback();
      }
    });    
  }
}

// Glob function for the file system
GitFileOperations.glob_streaming  = function(path) {
  // Comptability
  var nextTick = global.setImmediate || process.nextTick;
  // Create a stream object
  var stream = new process.EventEmitter();
  var processed_directories_count = 0;
  var top_level_files_count = -1;
  // Tick method
  var tick_function = function() {
    // If we are done emit end otherwise execute the method again
    processed_directories_count == top_level_files_count ? stream.emit("end") : nextTick(tick_function);
  }
  // set nextTick handler into action
  nextTick(tick_function);
  // Fetch the top directory
  fs.readdir(path, function(err, entries) {
    // The top level of files that need to be finished processing for us to be done
    if(entries !== undefined && entries.length > 0)  {
      entries.sort(function(a, b) {
          return a > b;
      });

      top_level_files_count = entries.length;
      // Execute the entries
      var procesEntry = function(i) {
        // Entry path
        var entry_path = path + "/" + entries[i];
        // Build glob function
        stat_with_entry(entry_path, stream, function() {
          processed_directories_count = processed_directories_count + 1;
          if (++i < entries.length) {
            procesEntry(i);
          }
        })();
      };
      procesEntry(0);
    } else {
      top_level_files_count = 0;
    }
  });  
  // Return the stream for execution
  return stream;
}

// Execute recursive glob function (private function)
var glob_function = function(path, files) {
  var entries = fs.readdirSync(path);
  entries.forEach(function(entry) {
    var entry_path = path + "/" + entry;
    
    var stat = fs.statSync(entry_path);
    if(stat.isDirectory()) {
      glob_function(entry_path, files);
    } else {
      files.push(entry_path);
    }
  })
}

// Glob function for the file system
GitFileOperations.glob = function(path, files, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  files = args.length ? args.shift() : [];
  // Fetch all the files
  glob_function(path, files);
  callback(null, files);
}

// Read a file
GitFileOperations.fs_read = function(path, file, callback) {
  fs.readFile(path + "/" + file, callback);
} 

// Make a directory
GitFileOperations.fs_mkdir = function(dir, callback) {
  fs.mkdir(dir, 16877, callback);
}

// Check if a directory exists
GitFileOperations.fs_exist = function(dir, path, callback) {
}

// Delete directory
GitFileOperations.fs_rmdir_r = function(dir, callback) {
  // Copy the old directory to the new one
  var child = exec('rm -rf ' + dir, function (error, stdout, stderr) {
      if (error !== null) {
        util.puts('exec error: ' + error);
        return callback(error, null);
      }
      return callback(null, null);    
  });    
}

// Write file
GitFileOperations.fs_write = function(dir, file, content, callback) {  
  // Let's make sure the parent directories exist, split the file into directories and content
  var file_parts = file.split("/");
  var file_name = file_parts.pop()
  var current_path = dir;
  // Create missing sub directories
  while(file_parts.length > 0) {
    var dir_path = file_parts.shift();
    current_path = current_path + "/" + dir_path;
    // Check if the directory exists (if it does not then create it)
    try {
      fs.statSync(current_path);      
    } catch(err) {
      fs.mkdirSync(current_path, 16877);
    }
  }
  
  // Write the file to disk
  current_path = dir + "/" + file;
  // Append the entry to the file
  fs.writeFile(current_path, content, callback);
}











