---
layout: default
title: MCAMC Registration
permalink: /mcamc/register
---

## MCAMC Registration


### I am registering as a/an...

<div style="text-align: center">
<span class="reg-choice" id="reg0" onclick="reg(0)"> ...individual student/parent. </span> 
<span class="reg-choice" id="reg1" onclick="reg(1)"> ...school or organization. </span>
</div>

<div class="cognito">
<script src="https://services.cognitoforms.com/s/5RmzrxaElkSFbjwAX0LpWA"></script>
</div>

<script type="text/javascript">
var choiceMade = false;
function reg(type) {
  document.getElementById("reg0").style.display = "none";
  document.getElementById("reg1").style.display = "none";
  document.getElementById("i-am-registering-as-aan").style.display = "none";
  if (!choiceMade) {
    if (type === 0) {
      Cognito.load("forms", { id: "2" });
    }
    if (type === 1) {
      Cognito.load("forms", { id: "1" });
    }
    choiceMade = true;
  }
}
</script>
