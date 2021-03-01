---
layout: post
title: Kubectl on M1 Macbook Air
---
## Getting Kubectl and Helm3 on M1 Macbook Air
I've got a kubernetes cluster running in my closet (say that 10x fast) and prefer to do most of my work on it. Kubectl and Helm available on this device save me from needing to SSH into the cluster at all times.

Unfortunately... 'brew install kubectl' and 'brew install helm3' didn't want to play nice with my shiny new laptop...

According to this [github issue](https://github.com/kubernetes/kubernetes/issues/97550#issue-775380450), all we need to do is add 'arm64' as a supported platform, then build from source

#### Clone the Kubernetes repo
```
cd ~/go/src
git clone git@github.com:kubernetes/kubernetes.git
cd k8s.io/kubernetes
```
#### Edit the file
```
sed -i '' -e 's/KUBE_SUPPORTED_CLIENT_PLATFORMS=(/KUBE_SUPPORTED_CLIENT_PLATFORMS=(\n  darwin\/arm64/' ./hack/lib/golang.sh
```

#### Build
```
make
```

#### "Install" the binary
```
sudo mv ./_output/bin/kubectl /usr/local/bin/kubectl && sudo chown root: /usr/local/bin/kubectl
```

#### Clone the Helm3 Repo
```
cd ~/go/src
git clone https://github.com/helm/helm.git
cd helm
```
#### Build
```
make
```
#### "Install" the binary
```
sudo mv ./bin/helm /usr/local/bin/helm && sudo chown root: /usr/local/bin/helm
```
