# Setup VSCode remote development

# Background

A lot of reasons can lead us to use EC2 as development environment.
We can use VSCode directly to manipulate the environment, git, code...etc on the EC2 remotely.

REF:

- [https://code.visualstudio.com/docs/remote/ssh-tutorial](https://code.visualstudio.com/docs/remote/ssh-tutorial)
- [https://guyernest.medium.com/connecting-vs-code-to-develop-machine-learning-models-in-the-aws-cloud-aa1ebd16f890](https://guyernest.medium.com/connecting-vs-code-to-develop-machine-learning-models-in-the-aws-cloud-aa1ebd16f890)

## Prerequisite

Assume you already setup ssh config like this:

```python
Host mf_jumpserver
	Hostname 18.180.196.64
	User keith
	IdentityFile /Users/leung.tsz.kit/.ssh/id_rsa
	Port 23422
	ForwardAgent Yes
	PubKeyAuthentication Yes
	UseKeychain Yes
Host ec2sandbox
	HostName keith.dev.aif.musubu.co.in
	User keith
	ProxyCommand ssh -W %h:%p mf_jumpserver
	# Only needed if you want to do port forwarding (tunnel)
	LocalForward 8888 localhost:8888
```

# Procedure

1. Open the `.ssh/config`
    - *Optional* You can install this [vscode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh-edit) to edit ssh config more easier
2. And added port forwarding, such as in the [step here](https://moneyforward.kibe.la/notes/204950#setup-ssh-tunnel)
3. Install below official VSCode extension
    - [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
4. You will see this button in bottom left after installing the extension
<img title='image.png' alt='image' src='/attachments/a1a91043-54f6-4e9c-8d45-13fd8fef7fc7' width="300" data-meta='{"width":300,"height":151}'>
5. Click "Connect to Host..."
<img title='image.png' alt='image' src='/attachments/25d8704e-8820-4201-9d24-5362b7715d37' width="1210" data-meta='{"width":1210,"height":238}'>
6. The ssh config host which you setup before should appear here as an option. Just choose it and everything would be setup automatically.
7. It is done now! You can click **File -> open folder** to select a remote folder to open as workspace. Also the terminal here would be inside the EC2 already.