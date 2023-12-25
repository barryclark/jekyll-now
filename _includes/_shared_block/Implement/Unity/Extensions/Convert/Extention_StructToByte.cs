using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

namespace Extension
{
    public static partial class Extention
    {
        //////
        // Struct <-> Byte[] Convert extensions
        //////

        /// <summary>
        /// Struct를 Byte로 변환합니다.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 바이트로 부터 스트럭트를 구합니다.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="buffer"></param>
        /// <exception cref="Exception"></exception>
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
    }
}
