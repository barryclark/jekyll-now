---
layout: memory
title: AWS Shadow Admin & IAM Policy Magic  
---

Prevent Creation of AWS Schadow Admins by giving attention on the following IAM permissions that can lead to shadow admin privileges

### 1. CreateAccessKey
An attacker with just `CreateAccessKey` IAM API permission could abuse it to create a new access key to another IAM admin account. An entity (user/group/role) with this permission in it’s policy is as powerful as other full admin users with the `AdministratorAccess` permissions. Compromising an account with this policy alone will allow the attacker to gain a new privileged access key and continue to execute malicious actions in the environment on behalf of the target user he has just created a new access key for.

### 2. CreateLoginProfile
With this permission, an attacker can take a privileged entity that only has API access keys (like an IAM entity that’s not meant for humans but for an application’s APIs automatic usage). Then the attacker can add a new password-based login profile, set a new password for that entity, impersonate it and execute the intended malicious action on behalf of the compromised user.

### 3. UpdateLoginProfile
This permission provides potential attackers the permission to reset other IAM users’ login passwords.

### 4. AttachUserPolicy, AttachGroupPolicy or AttachRolePolicy
An attacker with a policy containing these permissions could attach existing admin policy to any other entity he currently possesses.

### 5. PutUserPolicy, PutGroupPolicy or PutRolePolicy
These permissions permit the attacker to add `inline policies` to other entities as opposed to `managed policies`. An `inline policy` is a policy that is embedded in a principal entity (a user, group or role). So when you delete an entity, its embedded inline policies are deleted as well. The newly added inline policy defined by the attacker will allow the attacker to grant additional privileges to previously compromised entities.

### 6. CreatePolicy
Using this permission, the attacker could add a stealthy admin policy and call it a `ReadOnly policy`, making it look harmless.

### 7. AddUserToGroup
With this permission, an attacker could add his currently possessed user directly into the admin group of the organization.

### 8. UpdateAssumeRolePolicy
Every role has a policy that defines who can assume this role. This is typically referred to as the “role trust policy.” Using this permission, an attacker can change the assuming permissions of a privileged role and then assume it with a non-privileged account.

### 9. CreatePolicyVersion, SetDefaultPolicyVersion
Like `CreateAccessKey`, with the permissions to `CreatePolicyVersion` and `SetDefaultPolicyVersion`, attackers can change customer-managed policies and change a non-privileged entity to be a privileged one.

### 10. PassRole with CreateInstanceProfile/AddRoleToInstanceProfile
Like `CreateLoginProfile`, with these permissions to modify Instance Profiles, an attacker could create a new privileged instance profile and attach it to a compromised EC2 instance that he possesses.

[Source - SkyArk](https://github.com/cyberark/SkyArk)
