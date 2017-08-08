
var Repo = require('git/repo').Repo,
  util = require('util'),
  fs = require('fs'),
  exec  = require('child_process').exec;

var number_of_executions = 30;

var create_tmp_directory = function(clone_path, callback) {
  var filename = 'git_test' + new Date().getTime().toString() + Math.round((Math.random(100000) * 300)).toString();
  var tmp_path = '/tmp/' + filename;
  // Create directory
  fs.mkdirSync(tmp_path, 0777);
  // Copy the old directory to the new one
  var child = exec('cp -R ' + clone_path + ' ' + tmp_path, function (error, stdout, stderr) {
      if (error !== null) {
        util.puts('exec error: ' + error);
        return callback(error, null);
      }
      return callback(null, tmp_path);
  });
}

var destroy_directory = function(directory, callback) {
  // Copy the old directory to the new one
  var child = exec('rm -rf ' + directory, function (error, stdout, stderr) {
      if (error !== null) {
        util.puts('exec error: ' + error);
        return callback(error, null);
      }
      return callback(null, null);    
  });  
}

var commit1 = '5e3ee1198672257164ce3fe31dea3e40848e68d5'
var commit2 = 'ca8a30f5a7f0f163bbe3b6f0abf18a6c83b0687a'

var pack_object_function = function(repo) {  
  repo.commit('5e3ee1198672257164ce3fe31dea3e40848e68d5', function(err, commit) {
    repo.tree('cd7422af5a2e0fff3e94d6fb1a8fff03b2841881', function(err, tree) {
      repo.blob('4232d073306f01cf0b895864e5a5cfad7dd76fce', function(err, blob) {
        commit.parents[0].parents[0].parents[0];
      })
    })
  });  
}

var commits1_function = function(repo) {
  repo.commits(function(err, commits) {
    commits.length;
  })
}

var commits2_function = function(repo) {
  repo.commits('master', 15, function(err, log) {
    log.length;
    log.length;
    log[0];
    repo.commits('testing', function(err, commits) {
      commits.map(function(c) { return c.message; });
    })
  })
}

var big_revlist_function = function(repo) {
  repo.commits('master', 200, function(err, commits) {});
}

var log_function = function(repo) {
  repo.log('master', function(err, log) {
    log.length;
    log.length;
    log[0];
  })
}

var diff_function = function(repo) {
  repo.diff(commit1, commit2, function(err, diff) {});
}

var commit_diff_function = function(repo) {
  repo.commit_diff(commit1, function(err, diff) {});
}

var heads_function = function(repo) {
  repo.heads(function(err, heads) {
    heads.map(function(b) { return b.commit.id; });
  });
}

var execute_process = function(type) {
  var execute_function = null;
  
  // Check that we have the right function
  if(type == "packobj") {
    execute_function = pack_object_function;
  } else if(type == "commits1") {
    execute_function = commits1_function;
  } else if(type == "commits2") {
    execute_function = commits2_function;
  } else if(type == "big_revlist") {
    execute_function = big_revlist_function;
  } else if(type == "log") {
    execute_function = log_function;
  } else if(type == "diff") {
    execute_function = diff_function;
  } else if(type == "commit_diff") {
    execute_function = commit_diff_function;
  } else if(type == "heads") {
    execute_function = heads_function;
  }

  // Ensure that we have an executable function
  if(execute_function) {
    // Creat temp directory
    create_tmp_directory("/Users/christian.kvalheim/coding/checkouts/grit/test/dot_git", function(err, target_path) {
      // Open the repo
      new Repo(target_path + "/dot_git", {is_bare:true}, function(err, repo) {
        var start_time = new Date();
        
        // Execute the benchmark x number of times if a function is defined
        for(var i = 0; i < number_of_executions; i++) {
          execute_function(repo);
        }     
        
        var end_time = new Date();
        var total_miliseconds = end_time.getTime() - start_time.getTime();
        util.puts("[" + type + "]::executed in: " + (total_miliseconds/1000) + " seconds");        
        // Delete the directory
        destroy_directory(target_path, function(err, result) {});
      });      
    });
  }  
}

if(process.argv.length > 2 && process.argv[2].match(/packobj|commits1|commits2|big_revlist|log|diff|commit_diff|heads|all/)) {
  if(process.argv[2] == "all") {
    var tests = ["packobj", "commits1", "commits2", "big_revlist", "log", "diff", "commit_diff", "heads"];
    // var tests = ["packobj", "commits1", "commits2", "big_revlist", "log"];
    tests.forEach(function(t) {
      execute_process(t);
    })
  } else {
    execute_process(process.argv[2]);
  }  
} else {
  util.puts("Please provide the benchmark you wish to run in the form <node benchmarks [packobj|commits1|commits2|big_revlist|log|diff|commit_diff|heads|all]>")
}
  

