var GitCommit = require('./internal/git_commit').GitCommit,
  GitTree = require('./internal/git_tree').GitTree,
  GitTag = require('./internal/git_tag').GitTag,
  GitBlob = require('./internal/git_blob').GitBlob;

var GitObject = exports.GitObject = function() {}

GitObject.from_raw = function(raw_object, repository) {  
  if(raw_object.type == "blob") {
    return GitBlob.from_raw(raw_object, repository);
  } else if(raw_object.type == "tree") {
    return GitTree.from_raw(raw_object, repository);
  } else if(raw_object.type == "commit") {
    return GitCommit.from_raw(raw_object, repository);
  } else if(raw_object.type == "tag") {
    return GitTag.from_raw(raw_object, repository);
  } else {
    throw "got invalid object-type";
  }
}