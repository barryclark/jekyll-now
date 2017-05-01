There are a lot of flags avilable for the Angular CLI. But good luck finding out what they are.
So I have compiled a list of all of them.

- `--dry-run`: boolean, default false, perform dry-run so no changes are written to filesystem
- `--verbose`: boolean, default false
- `--link-cli`: boolean, default false, automatically link the @angular/cli package (more info)
- `--skip-install`: boolean, default false, skip npm install
- `--skip-git`: boolean, default false, don’t initialize git repository
- `--skip-tests`: boolean, default false, skip creating tests
- `--skip-commit`: boolean, default false, skip committing the first git commit
- `--directory`: string, name of directory to create, by default this is the same as the application name
- `--source-dir`: string, default 'src', name of source directory
- `--style`: string, default 'css', the style language to use ('css', 'less' or 'scss')
- `--prefix`: string, default 'app', the prefix to use when generating new components
- `--mobile`: boolean, default false, generate a Progressive Web App application (see section on upcoming features)
- `--routing`: boolean, default false, add module with routing information and import it in main app module
- `--inline-style`: boolean, default false, use inline styles when generating the new application
- `--inline-template`: boolean, default false, use inline templates when generating the new application

## Don't believe me?
Run `ng generate --help` to see all available options of your locally installed Angular CLI.
