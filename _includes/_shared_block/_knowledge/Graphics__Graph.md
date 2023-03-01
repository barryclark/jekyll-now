```mermaid
graph LR

SDF(SDF: SignedDistanceField)
RayMarching(Ray marching)

FloodFill(Flood fill)

subgraph Inverse Kinematics
    FABRIK(FABRIK)
end

SDF --> RayMarching
```