[
	'actor', 'binary_parser', 'blame', 'blame_line', 'blob', 'commit', 'commit_stats', 'config',
	'diff', 'file_index', 'file_window', 'git', 'git_file_operations', 'git_index', 'git_object',
	'head', 'loose_storage', 'merge', 'pack_storage', 'raw_object', 'ref', 'remote', 'repo', 'repository',
	'status', 'status_file', 'sub_module', 'tag', 'tree', 'user_info',
	'internal/directory_entry', 'internal/git_blob', 'internal/git_commit', 'internal/git_tag', 'internal/git_tree'
].forEach(function(path){
	var module = require('./' + path);
	for (var i in module)
		exports[i] = module[i];
});

[
	'zlib'
].forEach(function(path){
	var module = require('../zlib/' + path);
	for (var i in module)
		exports[i] = module[i];
});

[
	'sprintf'
].forEach(function(path){
	var module = require('../sprintf/' + path);
	for (var i in module)
		exports[i] = module[i];
});

[
	'block', 'callbacks', 'change', 'diff', 'hunk'
].forEach(function(path){
	var module = require('../diff/' + path);
	for (var i in module)
		exports[i] = module[i];
});

