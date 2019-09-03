---
layout: post
title: AWS CodeDeploy 사용하여 배포 자동화 하기
date: 2019-09-02
comments: true
categories: [Study, etc]
tags: [AWS, CodeDeploy]
excerpt: AWS EC2에 서비스를 배포 하는 것 까지 해보았으니, 이제 그 일련의 과정들에 대한 자동화에 도전! 그 첫 시도로 AWS CodeDeploy를 이용한 배포자동화를 구축해 보겠다. AWS CodeDeploy는 특정 코드를 배포해 달라고 요청하면 사전에 정의해 놓은 설정에 따라 EC2에 배포하는 역할을 한다.
---

AWS EC2에 서비스를 배포 하는 것 까지 해보았으니, 이제 그 일련의 과정들에 대한 자동화에 도전! 그 첫 시도로 **AWS CodeDeploy를 이용한 배포 자동화**를 구축해 보겠다. AWS CodeDeploy는 특정 코드를 배포해 달라고 요청하면 사전에 정의해 놓은 설정에 따라 EC2에 배포하는 역할을 한다.

![CodeDeploy](/images/code_deploy.png "CodeDeploy")

### EC2 IAM Role 생성 및 부여

먼저, EC2가 사용할 IAM 역할을 생성한다. [AWS 서비스] 개체의 [EC2] 서비스의 역할을 만들며, 권한정책으로 AmazonS3FullAccess, AWSCodeDeployFullAccess, AWSCodeDeployRole를 연결한다. 만들어진 역할은 현재 실행중인 EC2인스턴스에 부여한다.

### Code Deploy Agent 용 사용자 생성

IAM 콘솔에서 그룹을 생성하고, 아래의 정책을 생성하여 연결한다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:*",
        "codedeploy:*",
        "ec2:*",
        "lambda:*",
        "ecs:*",
        "elasticloadbalancing:*",
        "iam:AddRoleToInstanceProfile",
        "iam:CreateInstanceProfile",
        "iam:CreateRole",
        "iam:DeleteInstanceProfile",
        "iam:DeleteRole",
        "iam:DeleteRolePolicy",
        "iam:GetInstanceProfile",
        "iam:GetRole",
        "iam:GetRolePolicy",
        "iam:ListInstanceProfilesForRole",
        "iam:ListRolePolicies",
        "iam:ListRoles",
        "iam:PassRole",
        "iam:PutRolePolicy",
        "iam:RemoveRoleFromInstanceProfile",
        "s3:*"
      ],
      "Resource": "*"
    }
  ]
}
```

그리고 이 그룹에 사용자를 추가하는데, [프로그래밍 방식 엑세스]를 선택해야 한다. 사용자를 생성하고 나면 **AWS Access Key ID**와 **AWS Secret Access Key**가 부여되는데, 바로 사용할것이므로 메모해 두거나 csv 파일을 다운받아 둔다.

### EC2에 CodeDeploy Agent 설치

EC2에 접속하여 aws-cli를 설치/업데이트 한다. AWS Linux에는 이미 설치되어 있으므로 업데이트 한다.

```bash
pip install awscli --upgrade --user
```

다음으로 aws-cli를 구성하는데, 이 때, 아까 부여받았던 **AWS Access Key ID**와 **AWS Secret Access Key**를 입력한다.

```bash
cd /home/ec2-user/
sudo aws configure
AWS Access Key ID [None]: # access key
AWS Secret Access Key [None]: # secret access key
Default region name [None]: # 리전 네임
Default output format [None]: json
```

이제, [AWS 자습서](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html)에 따라 CodeDeploy Agent를 설치한다.

```bash
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status # 실행 확인
```

추가적으로 EC2가 재부팅될 경우 자동으로 CodeDeploy Agent가 실행될 수 있도록 `codedeploy-startup.sh` 파일을 생성해 준다.

```bash
sudo vim /etc/init.d/codedeploy-startup.sh
```

파일 내용은 아래와 같으며,

```bash
#!/bin/bash
echo 'Starting codedeploy-agent'
sudo service codedeploy-agent restart
```

파일을 저장한 뒤 실행 권한을 추가해 준다.

```bash
sudo chmod +x /etc/init.d/codedeploy-startup.sh
```

그리고, 배포 파일이 담길 폴더를 생성해 준다.

```bash
cd home/ec2-user/var/www/
mkdir deploy
```

### 프로젝트 내 appspec.yml 파일 생성

CodeDeploy Agent는 프로젝트의 루트 디렉토리에 있는 appspec.yml에 따라 배포를 진행하게 된다. 따라서 배포 파일을 어디에 저장할 것인지, 배포 각 단계에서 어떤 작업을 진행해야 하는지 명시 해 주어야 한다. [참고자료](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file.html)

```yml
# appspec.yml
version: 0.0
os: linux
files:
  - source: /
    destination: /home/ec2-user/var/www/deploy/
permissions:
  - object: /
    pattern: "**"
    owner: ec2-user
    group: ec2-user
hooks:
  AfterInstall:
    - location: scripts/install_dependencies
      timeout: 120
      runas: ec2-user
  ApplicationStart:
    - location: scripts/restart_server
      timeout: 10
      runas: root
  ValidateService:
    - location: scripts/validate_server
      timeout: 30
      runas: ec2-user
```

script 폴더 내 각 파일은 아래와 같다.
마지막 validate_server는 서버가 제대로 재시작 되었는지 확인하기 위해서 로컬호스트로 get요청을 보내 응답코드를 확인하는 과정이다.

```
# scripts/install_dependencies
echo '============================'
echo 'Running install_dependencies'
echo '============================'

/usr/local/bin/pm2 kill
sudo service mysqld start
source /home/ec2-user/.bash_profile
cd /home/ec2-user/var/www/deploy
npm install

# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

NODE_ENV=production /usr/local/bin/pm2 start /home/ec2-user/var/www/lifeinjeju/app.js -i 0 --name "admin" &

# scripts/validate_server
echo '======================='
echo 'Running validate_server'
echo '======================='

result=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/review)

echo Check http://localhost:3001/review
echo $result

if [[ "$result" =~ "200" ]]; then
  exit 0
else
  exit 1
fi
```

### Code Deploy 생성 및 실행

먼저, Code Deploy 용 role을 생성해 준다. [AWS 서비스] 개체의 [CodeDeploy] 서비스를 선택해 준다. 정책은 **AWSCodeDeployRole**을 선택한다.

이제 CodeDeploy 콘솔에서 애플리케이션을 생성할 차례이다. 컴퓨팅 플랫폼을 **EC2/온프레미스**로 선택해 준다. 생성된 애플리케이션에서, 배포 그룹을 생성해 준다. 서비스 역할은 이전에 생성했던 Code Deploy 용 role을 선택하고, 배포 유형을 선택한다. 환경 구성에서 Amazon EC2 인스턴스를 선택하고, 배포 대상 인스턴스를 선택한다. 로드밸런싱은 해제한다.

배포 그룹이 생성되면, 배포를 생성할 수 있다. 방금 전 생성했던 배포그룹을 선택해 주고, Github 코드를 사용할 것이기 때문에 개정유형은 Github으로 선택한다. 별칭을 입력하면 github에 연결할 수 있다. 리포지토리 이름은 `별칭/리포지토리 이름`으로 입력하고, 배포하고자하는 커밋아이디를 입력한다.

이제 배포 만들기를 클릭하면 배포가 진행된다.
