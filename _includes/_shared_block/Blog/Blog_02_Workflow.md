<center><div class="mermaid">
graph TD

subgraph Internal
WillDo(할 것)
Doing(하고있는 것)
Did(한 것)
end

subgraph Blog
SharedBlock
Post
end

WillDo --> Doing
Doing --개인적인인 일들--> Did
Doing --공유하거나 정리하고자 하는 지식인 경우--> SharedBlock
SharedBlock --> Post
</div></center>


각각의 `SharedBlock`은 `기억의 궁전`에서 공간에 해당하며 `생각을 정리하기`를 이용하여 내용을 정리합니다.
