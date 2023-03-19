Ico Sphere는 일반적으로 이음매가 있는 이십면체(Icosahedron)를 가지고 만들어진 구체입니다. 이 구체는 이십개의 삼각형으로 이루어진 이십면체의 각 면의 중심에서 발생하는 동일한 크기의 삼각형으로 쪼개어진 후, 이들을 서로 연결하여 만듭니다.

Ico Sphere는 경량화된 고체 재료로 제작될 수 있으며, Geodesic Sphere와 같이 강한 구조적 안정성과 견고함을 유지하면서도 내부 공간을 효율적으로 이용할 수 있습니다. 이러한 특성 때문에, Ico Sphere는 3D 모델링 및 컴퓨터 그래픽스에서 자주 사용됩니다.

특히, Ico Sphere는 구를 모사하는 데 사용되는 경우가 많습니다. 구체를 만드는 데 사용되는 전통적인 방법인 구분(구를 육면체로 나누어 그 위에 적절한 수의 삼각형을 그리는 것)에 비해, Ico Sphere는 더 정교한 모델링을 가능하게 하고 표면을 더 자연스럽게 표현할 수 있습니다.

다음은 Unity에서 IcoSphere을 만드는 코드입니다.

```c#
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(MeshFilter), typeof(MeshRenderer))]
public class IcoSphereGenerator : MonoBehaviour
{
    public int subdivisions = 2;
    public float radius = 1f;

    private Mesh mesh;

    private void Start()
    {
        GenerateIcoSphere();
    }

    private void GenerateIcoSphere()
    {
        gameObject.AddComponent<MeshFilter>();
        gameObject.AddComponent<MeshRenderer>();

        mesh = new Mesh();
        GetComponent<MeshFilter>().mesh = mesh;

        IcoSphere.Create(out List<Vector3> vertices, out List<int> triangles, subdivisions, radius);

        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();
        mesh.RecalculateNormals();
    }
}

public static class IcoSphere
{
    private static Vector3[] directions = {
        - new Vector3(-1, 1, 1), - new Vector3(1, 1, 1), - new Vector3(-1, -1, 1), - new Vector3(1, -1, 1),
        - new Vector3(-1, 1, -1), - new Vector3(1, 1, -1), - new Vector3(-1, -1, -1), - new Vector3(1, -1, -1)
    };

    public static void Create(out List<Vector3> vertices, out List<int> triangles, int subdivisions, float radius)
    {
        vertices = new List<Vector3>();
        triangles = new List<int>();

        foreach (var direction in directions)
        {
            vertices.Add(direction.normalized * radius);
        }

        triangles.AddRange(new int[] {
            0, 1, 2, 1, 3, 2, 4, 0, 6, 0, 2, 6, 5, 4, 7, 4, 6, 7,
            1, 0, 5, 0, 4, 5, 3, 1, 7, 1, 5, 7, 2, 3, 6, 3, 7, 6
        });
        for (int i = 0; i < subdivisions; i++)
        {
            Subdivide(vertices, triangles);
        }

        for (int i = 0; i < vertices.Count; i++)
        {
            vertices[i] = vertices[i].normalized * radius;
        }
    }

    private static void Subdivide(List<Vector3> vertices, List<int> triangles)
    {
        List<int> newTriangles = new List<int>();

        for (int i = 0; i < triangles.Count; i += 3)
        {
            int a = GetMiddlePoint(triangles[i], triangles[i + 1], vertices);
            int b = GetMiddlePoint(triangles[i + 1], triangles[i + 2], vertices);
            int c = GetMiddlePoint(triangles[i + 2], triangles[i], vertices);

            newTriangles.AddRange(new int[] {
            triangles[i], a, c,
            triangles[i + 1], b, a,
            triangles[i + 2], c, b,
            a, b, c
        });
        }

        triangles.Clear();
        triangles.AddRange(newTriangles);
    }

    private static int GetMiddlePoint(int a, int b, List<Vector3> vertices)
    {
        Vector3 middle = (vertices[a] + vertices[b]) * 0.5f;
        int index = vertices.Count;
        vertices.Add(middle);
        return index;
    }
}
```