# Remove specific color

Use openCV to remove

```python
import pytesseract
import cv2

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files (x86)\\Tesseract-OCR\\tesseract.exe'

img = cv2.imread('idText.png')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
adaptiveThresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 35, 90)

config = '-l eng --oem 1 --psm 3'
text = pytesseract.image_to_string(adaptiveThresh, config=config)

print("Result: " + text)

cv2.imshow('original', img)
cv2.imshow('adaptiveThresh', adaptiveThresh)

cv2.waitKey(0)
```

Or apply `morphological transformations` (i.e. **Erosion)**

```python
import cv2

image = cv2.imread('1.png')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
thresh = cv2.threshold(gray,105, 255, cv2.THRESH_BINARY_INV)[1]
thresh = 255 - thresh

kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
result = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=1)

cv2.imshow('thresh', thresh)
cv2.imshow('result', result)
cv2.imwrite('result.png', result)
cv2.waitKey()
```