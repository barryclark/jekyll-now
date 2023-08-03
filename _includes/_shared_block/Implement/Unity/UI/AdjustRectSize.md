```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Assertions;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using WRStudio.WRFramework.UI;

namespace WRStudio.RobotAR.UI
{
    /// <summary>
    /// RectSize를 조정하는 View입니다.
    /// </summary>
    public class AdjustRectSizeView : ViewBase
    {
        [Header("AdjustRectSizeView")]

        /// <summary>
        /// 크기가 조절되는 렉트의 Anchors는 { 0.5, 0.5, 0.5, 0.5 }로 가정합니다.
        /// </summary>
        [SerializeField] private RectTransform m_rect;

        private Vector2 m_lastSize = -Vector2.one;

        public Vector2 LastSize { get => m_lastSize; private set => m_lastSize = value; }

        public override void Initialize()
        {
            base.Initialize();
        }

        /// <summary>
        /// rect를 view에 비율을 유지한채로 가능한 꽉채웁니다.
        /// </summary>
        /// <param name="newSize"></param>
        public void SetData(Vector2 newSize)
        {
            //Assert.IsTrue(newSize.sqrMagnitude > 0);

            if (LastSize != newSize)
            {
                AdjustToFit(newSize);
                LastSize = newSize;
            }
        }

        private void OnRectTransformDimensionsChange()
        {
            // 부모 트랜스폼이 변경되었을 때, rect를 view에 비율을 유지한채로 가능한 꽉채웁니다.
            AdjustToFit(m_rect.sizeDelta);
        }

        /// <summary>
        /// 왼쪽으로 얼만큼 떨어져 있는지 반환합니다.
        /// </summary>
        /// <param name="rectSize"></param>
        /// <returns></returns>
        public float CalculateLeftOffset(Vector2 rectSize)
        {
            return (this.View.rect.size.x - View.rect.CalculateFitInRectSize(rectSize).x) / 2.0f;
        }

        /// <summary>
        /// rect를 view에 비율을 유지한채로 가능한 꽉채웁니다.
        /// </summary>
        /// <param name="newSize"></param>
        private void AdjustToFit(Vector2 newSize)
        {
            m_rect.sizeDelta = View.rect.CalculateFitInRectSize(newSize);
        }
    }
}
```
