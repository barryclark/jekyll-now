```c#
        ...
        [SerializeField] private CharacterController m_controller;
        [SerializeField] private GameObject m_playerCameraRoot;

        [Header("캐릭터 움직임 설정")]
        [SerializeField] private float m_moveSpeed = 4.0f;
        [SerializeField] private float m_rotationSpeed = 1.0f;

        [SerializeField] private float m_cameraTopClamp = 89.0f;
        [SerializeField] private float m_cameraBottomClamp = -89.0f;
        
        private bool m_bRotatingCamera = false;

        public CharacterController Controller { get => m_controller; }
        public GameObject PlayerCameraRoot { get => m_playerCameraRoot; }
```

Update 로직입니다.
```c#
        private void Update()
        {
            Vector2 movement2D = GetMovement2D();
            Vector2 cameraRotation = GetCameraRotation();

            if (movement2D != Vector2.zero)
            {
                Move(movement2D);
            }

            // 중력을 적용합니다.
            if (!m_controller.isGrounded)
            {
                m_controller.Move(new Vector3(0.0f, -9.8f, 0.0f));
            }

            if (AllowCameraRotation() && cameraRotation != Vector2.zero)
            {
                RotateCamera(cameraRotation);
            }
        }
```

Movement 로직입니다.
```c#
        private Vector2 GetMovement2D()
        {
            Vector2 movement = new Vector2();

            if (Input.GetAxisRaw("Vertical") != 0)
            {
                movement.x = Input.GetAxis("Vertical");
            }

            if (Input.GetAxisRaw("Horizontal") != 0)
            {
                movement.y = Input.GetAxis("Horizontal");
            }

            return movement;
        }

        private Vector2 GetCameraRotation()
        {
            Vector2 cameraRotation = new Vector2();

            cameraRotation.x = Input.GetAxis("Mouse X");
            cameraRotation.y = -Input.GetAxis("Mouse Y");

            return cameraRotation;
        }

        private bool AllowCameraRotation()
        {
            if (Input.GetMouseButton(0))
            {
                if (m_bRotatingCamera == false)
                {
                    m_bRotatingCamera = true;

                    Cursor.visible = false;
                    Cursor.lockState = CursorLockMode.Confined;
                }
            }
            else
            {
                if (m_bRotatingCamera == true)
                {
                    m_bRotatingCamera = false;

                    Cursor.visible = true;
                    Cursor.lockState = CursorLockMode.None;
                }
            }

            return m_bRotatingCamera;
        }

        private void Move(Vector2 movement2D)
        {
            Vector3 motion = new Vector3();

            motion += movement2D.x * transform.forward;
            motion += movement2D.y * transform.right;
            motion = motion.normalized * m_moveSpeed * Time.deltaTime;

            m_controller.Move(motion);
        }

        private void RotateCamera(Vector2 CameraRotation)
        {
            CameraRotation *= m_rotationSpeed;
            transform.Rotate(Vector3.up, CameraRotation.x);

            float newXRotation = m_playerCameraRoot.transform.localRotation.eulerAngles.x + CameraRotation.y;
            newXRotation = ClampAngle(newXRotation, m_cameraBottomClamp, m_cameraTopClamp);
            m_playerCameraRoot.transform.localRotation = Quaternion.Euler(newXRotation, 0.0f, 0.0f);
        }

        private static float ClampAngle(float angle, float min, float max)
        {
            angle = NormalizeAngle(angle);
            if (angle > 180)
            {
                angle -= 360;
            }
            else if (angle < -180)
            {
                angle += 360;
            }

            min = NormalizeAngle(min);
            if (min > 180)
            {
                min -= 360;
            }
            else if (min < -180)
            {
                min += 360;
            }

            max = NormalizeAngle(max);
            if (max > 180)
            {
                max -= 360;
            }
            else if (max < -180)
            {
                max += 360;
            }

            return Mathf.Clamp(angle, min, max);
        }

        private static float NormalizeAngle(float angle)
        {
            while (angle > 360)
                angle -= 360;
            while (angle < 0)
                angle += 360;
            return angle;
        }
```
