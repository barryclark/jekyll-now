//var GitHub = require('github-api');

// basic auth
const gh = new GitHub({
   username: 'junshern',
   password: 'ee28add524903226807f19493fc03976d8e3b73d'
});

const me = gh.getUser();

me.listRepos()
	.then(function({data: reposJson}) {
		console.log(`junshern has ${reposJson.length} repos!`);
		//var repos = JSON.stringify(reposJson, null, 2); // spacing level = 2
		//console.log(repos);
		for (var i=0; i<reposJson.length; i++) {
			console.log(reposJson[i].name);
			console.log(reposJson[i].description);
			console.log(reposJson[i].html_url);
			console.log(reposJson[i].stargazers_count);
			console.log(reposJson[i].language);
			console.log('');
		}
	});
