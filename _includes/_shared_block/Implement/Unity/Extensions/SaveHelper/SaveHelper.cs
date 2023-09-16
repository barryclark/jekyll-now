using UnityEngine;

public static partial class SaveHelper
{
    /// <summary>
    /// 파일을 저장합니다.
    /// </summary>
    /// <param name="path"></param>
    /// <param name="fileName"></param>
    /// <param name="data"></param>
    public static void SaveFile(string path, string fileName, string data)
    {
        string filePath = path + "/" + fileName;

        System.IO.File.WriteAllText(filePath, data);
        Debug.Log($"File is saved. \n Path : {path} \n Data : {data}");
    }

    /// <summary>
    /// 상위 디렉토리를 반환합니다.
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static string UpperDirectory(string path)
    {
        return System.IO.Directory.GetParent(path).FullName;
    }

    /// <summary>
    /// 상위 디렉토리를 반환합니다.
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static string Upper(this string path)
    {
        return UpperDirectory(path);
    }

    /// <summary>
    /// 디렉토리를 확인하고 없다면 디렉토리를 만듭니다.
    /// </summary>
    /// <param name="path"></param>
    /// <param name="createDirectory"></param>
    public static void CheckPath(string path, bool createDirectory)
    {
        if (System.IO.Directory.Exists(path) == false)
        {
            if (createDirectory)
            {
                System.IO.Directory.CreateDirectory(path);
            }
            else
            {
                Debug.LogError($"Path is not exist. \n Path : {path}");
            }
        }
    }
}
