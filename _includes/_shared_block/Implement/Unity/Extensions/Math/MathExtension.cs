public static partial class MathExtention
{
    /// TODO : <see cref="RealSenseCameraDevice.CalculateLocalPosition"/>와 <see cref="RealSenseCameraDevice.CalculateScreenPosition"/>를 아래 확장으로 대체하여 통합합해야함. 이때 DeprojectPixelToPoint에서 y축의 반환이 다르니 주의할것.
    /// <see cref="Intrinsics"/>와 <see cref="Extrinsics"/>의 확장 메서드
    /// <br>
    /// <see href="https://github.com/IntelRealSense/librealsense/blob/5e73f7bb906a3cbec8ae43e888f182cc56c18692/include/librealsense2/rsutil.h#"/>
    /// </br>
    /// <br>
    /// <see href="https://lightbuzz.com/intel-realsense-coordinate-mapping/"/>
    /// </br>

    /// <summary>
    /// 로컬 좌표를 픽셀좌표로 변환합니다.
    /// </summary>
    /// <param name="intrinsics"></param>
    /// <param name="fromPoint"></param>
    /// <param name="toPoint"></param>
    public static Vector2 ProjectPointToPixel(this Intrinsics intrinsics, in Vector3 fromPoint)
    {
        float x = fromPoint[0] / fromPoint[2];
        float y = fromPoint[1] / fromPoint[2];

        if (intrinsics.model == Distortion.ModifiedBrownConrady)
        {
            float r2 = x * x + y * y;
            float f = 1 + intrinsics.coeffs[0] * r2 + intrinsics.coeffs[1] * r2 * r2 + intrinsics.coeffs[4] * r2 * r2 * r2;
            x *= f;
            y *= f;
            float dx = x + 2 * intrinsics.coeffs[2] * x * y + intrinsics.coeffs[3] * (r2 + 2 * x * x);
            float dy = y + 2 * intrinsics.coeffs[3] * x * y + intrinsics.coeffs[2] * (r2 + 2 * y * y);
            x = dx;
            y = dy;
        }
        else if (intrinsics.model == Distortion.Ftheta)
        {
            float r = (float)Math.Sqrt(x * x + y * y);
            float rd = (1f / intrinsics.coeffs[0] * (float)Math.Atan(2f * r * (float)Math.Tan(intrinsics.coeffs[0] / 2f)));
            x *= rd / r;
            y *= rd / r;
        }

        Vector2 toPixel;
        toPixel.x = x * intrinsics.fx + intrinsics.ppx;
        toPixel.y = y * intrinsics.fy + intrinsics.ppy;
        return toPixel;
    }

    /// <summary>
    /// 픽셀좌표를 로컬 좌표로 변환합니다.
    /// </summary>
    /// <param name="toPixel"></param>
    /// <param name="intrinsics"></param>
    /// <param name="fromPoint"></param>
    /// <param name="depth"></param>
    public static Vector3 DeprojectPixelToPoint(this Intrinsics intrinsics, in Vector2 fromPixel, float depth)
    {
        Assert.IsTrue(intrinsics.model != Distortion.ModifiedBrownConrady, "Cannot deproject from a forward-distorted image");
        Assert.IsTrue(intrinsics.model != Distortion.Ftheta, "Cannot deproject to an ftheta image");

        float x = (fromPixel.x - intrinsics.ppx) / intrinsics.fx;
        float y = (fromPixel.y - intrinsics.ppy) / intrinsics.fy;
        if (intrinsics.model == Distortion.InverseBrownConrady)
        {
            float r2 = x * x + y * y;
            float f = 1 + intrinsics.coeffs[0] * r2 + intrinsics.coeffs[1] * r2 * r2 + intrinsics.coeffs[4] * r2 * r2 * r2;
            float ux = x * f + 2 * intrinsics.coeffs[2] * x * y + intrinsics.coeffs[3] * (r2 + 2 * x * x);
            float uy = y * f + 2 * intrinsics.coeffs[3] * x * y + intrinsics.coeffs[2] * (r2 + 2 * y * y);
            x = ux;
            y = uy;
        }

        Vector3 toPoint;
        toPoint.x = depth * x;
        toPoint.y = depth * y;
        toPoint.z = depth;
        return toPoint;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="extrinsics"></param>
    /// <param name="fromPoint"></param>
    /// <param name="toPoint"></param>
    public static Vector3 TransformPointToPoint(this Extrinsics extrinsics, in Vector3 fromPoint)
    {
        Vector3 toPoint;
        toPoint.x = extrinsics.rotation[0] * fromPoint[0] + extrinsics.rotation[3] * fromPoint[1] + extrinsics.rotation[6] * fromPoint[2] + extrinsics.translation[0];
        toPoint.y = extrinsics.rotation[1] * fromPoint[0] + extrinsics.rotation[4] * fromPoint[1] + extrinsics.rotation[7] * fromPoint[2] + extrinsics.translation[1];
        toPoint.z = extrinsics.rotation[2] * fromPoint[0] + extrinsics.rotation[5] * fromPoint[1] + extrinsics.rotation[8] * fromPoint[2] + extrinsics.translation[2];
        return toPoint;
    }

    public static Type TryDequeueUntilLast<Type>(this ConcurrentQueue<Type> queue)
    {
        // 앞에있는 프레임을 Dequeue하고 마지막 프레임을 얻어야 하므로 Dequeue해야 하는 횟수는 Count - 1입니다.
        int tryDequeueNum = queue.Count;

        Type processedData = default(Type);
        while (tryDequeueNum > 0)
        {
            queue.TryDequeue(out processedData);

            tryDequeueNum--;
        }

        return processedData;
    }

    public static GameObject CreateChildGameObject(this MonoBehaviour parent, string objectName)
    {
        GameObject gameObject = new GameObject(objectName);
        gameObject.transform.parent = parent.transform;

        return gameObject;
    }

    //
    // Ray 확장
    //

    /// <summary>
    /// Calculates the closest position on a ray to a specific point.
    /// </summary>
    /// <param name="ray">The ray for which to find the closest position.</param>
    /// <param name="point">The point to which the closest position is calculated.</param>
    /// <returns>The closest position on the ray to the specified point.</returns>
    public static Vector3 GetClosestPointOnRay(this Ray ray, Vector3 point)
    {
        Vector3 pointToOriginVector = ray.origin - point;
        return point + pointToOriginVector - Vector3.Project(pointToOriginVector, ray.direction);
    }

    // 
    // Quaternion 확장
    // 

    /// <summary>
    /// Decomposes a <see cref="Quaternion"/> into swing and twist components based on an axis.
    /// </summary>
    /// <param name="quat">The quaternion to decompose.</param>
    /// <param name="twistAxis">The axis used as a reference for the decomposition.</param>
    /// <param name="swing">The swing component.</param>
    /// <param name="twist">The twist component.</param>
    public static void DecomposeSwingTwist(this Quaternion quat, Vector3 twistAxis, out Quaternion swing, out Quaternion twist)
    {
        Vector3 r = new Vector3(quat.x, quat.y, quat.z); // (rotation axis) * cos(angle / 2)

        // Singularity: rotation by 180 degrees
        if (r.sqrMagnitude < 0.001f)
        {
            Vector3 rotatedTwistAxis = quat * twistAxis;
            Vector3 swingAxis = Vector3.Cross(twistAxis, rotatedTwistAxis);

            if (swingAxis.sqrMagnitude > 0.001f)
            {
                float swingAngle = Vector3.Angle(twistAxis, rotatedTwistAxis);
                swing = Quaternion.AngleAxis(swingAngle, swingAxis);
            }
            else
            {
                // More singularity: rotation axis parallel to twist axis
                swing = Quaternion.identity; // No swing
            }

            // Always twist 180 degrees on singularity
            twist = Quaternion.AngleAxis(180.0f, twistAxis);
            return;
        }

        // Formula & proof: 
        // http://www.euclideanspace.com/maths/geometry/rotations/for/decomposition/
        Vector3 p = Vector3.Project(r, twistAxis);
        twist = new Quaternion(p.x, p.y, p.z, quat.w);
        twist.Normalize();
        swing = quat * Quaternion.Inverse(twist);
    }

    public static byte[] ToBytes<T>(this T obj) 
        where T : struct
    {
        int size = Marshal.SizeOf(obj);
        byte[] arr = new byte[size];
        IntPtr ptr = Marshal.AllocHGlobal(size);

        Marshal.StructureToPtr(obj, ptr, true);
        Marshal.Copy(ptr, arr, 0, size);
        Marshal.FreeHGlobal(ptr);
        return arr;
    }

    public static void FromBytes<T>(this ref T obj, byte[] buffer) 
        where T : struct
    {
        int size = Marshal.SizeOf(typeof(T));
        if (size > buffer.Length)
        {
            throw new Exception();
        }

        IntPtr ptr = Marshal.AllocHGlobal(size);
        Marshal.Copy(buffer, 0, ptr, size);
        obj = (T)Marshal.PtrToStructure(ptr, typeof(T));
        Marshal.FreeHGlobal(ptr);
    }

    //
    // Geometry
    //

    /// <summary>
    /// 외심원을 구합니다.
    /// <br>
    /// * <see href="https://wiki.freecad.org/Macro_Draft_Circle_3_Points_3D/it"/>
    /// </br>
    /// </summary>
    /// <param name="p1"></param>
    /// <param name="p2"></param>
    /// <param name="p3"></param>
    /// <returns></returns>
    public static (Vector3 center, float radius, Vector3 normal) CalculateCircumcenter(this Vector3 p1, Vector3 p2, Vector3 p3)
    {
        var p1p2Size = (p2 - p1).magnitude;
        var p2p3Size = (p3 - p2).magnitude;
        var p3p1Size = (p1 - p3).magnitude;

        Vector3 centerPoint = Vector3.zero;
        float radius = 0f;

        // Circle radius.
        var cross = Vector3.Cross(p1 - p2, p2 - p3);
        var l = cross.magnitude;
        if (l < 1e-8)
        {
            Debug.LogError("The three points are aligned");
        }
        else
        {
            radius = p1p2Size * p2p3Size * p3p1Size / 2 / l;

            // Sphere center.
            var a = p2p3Size * p2p3Size * Vector3.Dot(p1 - p2, p1 - p3) / 2 / l / l;
            var b = p3p1Size * p3p1Size * Vector3.Dot(p2 - p1, p2 - p3) / 2 / l / l;
            var c = p1p2Size * p1p2Size * Vector3.Dot(p3 - p1, p3 - p2) / 2 / l / l;
            p1 *= (a);
            p2 *= (b);
            p3 *= (c);
            centerPoint = p1 + p2 + p3;
        }

        return (centerPoint, radius, cross.normalized);
    }
}
