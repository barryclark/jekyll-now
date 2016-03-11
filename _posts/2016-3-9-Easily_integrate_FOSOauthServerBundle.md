NOTE: this post is in progress

In this post, we create a secured area in Symfony 2. This area is only accessible by members. Members must use a valid username and password to access to the secured page.

### 1.Create the login page

The first thing to do is to create a login page.

src/MyBundle/Resources/views/Login/login.html.twig:
```html
<form
    action="{{ path("admin_login_check") }}"
    method="post"
>
    <input
        type="text"
        id="username"
        name="username"
    />
    <input
        type="password"
        id="password"
        name="password"
    />
    <button
        type="submit"
        id="login"
        name="login"
    >
        Login
    </button>
</form>
```

Create the dedicated action in the login controller.

src/MyBundle/Controller/LoginController.php:
```php
public function loginAction()
{
    return $this->render('MyBundle:Login:login.html.twig');
}
```

Create the dedicated route.

src/MyBundle/Resources/config/routing.yml:
```yml
admin_login:
    path:   /admin/login
    defaults: { _controller: MyBundle:Login:login }

admin_login_check:
    path:   /admin/login-check
    defaults: { _controller: FOSUserBundle:Security:check }
```
