```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Singleton<T> : MonoBehaviour where T : Singleton<T>
{
    public static T Instance
    {
        get
        {
            if (m_instance == null)
            {
                GameObject obj = GameObject.Find(typeof(T).Name);
                if(obj)
                {
                    m_instance = obj.GetComponent<T>();
                }
            }
            if (m_instance == null)
            {
                GameObject obj = new GameObject(typeof(T).Name);
                m_instance = obj.AddComponent<T>();
            }
            return m_instance;
        }
    }
    private static T m_instance;
    protected virtual void OnCreated()
    {
        
    }
}
```