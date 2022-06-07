# Load balancer

# ALB

- AWS resource explanation
    - 1 x ALB
        - N x Listener → listen to specific url by defined rules
        - N x Target Group → point to specific ECS service(s)