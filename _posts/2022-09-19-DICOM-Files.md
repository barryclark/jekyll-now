# 

### An overview on DICOM:

DICOM — Digital Imaging and Communications in Medicine — is the international standard for medical images and related information. It defines the formats for medical images that can be exchanged with the data and quality necessary for clinical use.

DICOM is implemented in almost every radiology, cardiology imaging, and radiotherapy device (X-ray, CT, MRI, ultrasound, etc.), and increasingly in devices in other medical domains such as ophthalmology and dentistry. With hundreds of thousands of medical imaging devices in use, DICOM is one of the most widely deployed healthcare messaging Standards in the world. [1]

### How to view DICOM files / images:

A DICOM viewer is typically needed to view DICOM files. Such as:

- ***WEASIS MEDICAL VIEWER*** is cross-platform, free/libre and open source software, multi-language and allows a flexible integration to PACS, RIS, HIS or PHR . It allows high-quality renderings with high performance through the OpenCV library. (**Supported OS**: Windows, Linux, and Mac OS X). [2]
- ***MicroDicom*** is an application for primary processing and preservation of medical images in DICOM format (**Supported OS: Windows**) *. [3]
- For non-sensitive data, a web-based tool (***Jack Imaging Viewer***) is an option. [4]
- (Note: Most DICOM viewers only support Windows OS).

Another way of viewing and processing DICOM files is through the Python library *Pydicom* [5]; this library allows the user to read, write, access, and modify DICOM files.

To view a DICOM image, use the following command:

```python
import pydicom
import matplotlib.pyplot as plt

ds = pydicom.dcmread('path/to/file')

# plot the image using matplotlib
plt.imshow(ds.pixel_array, cmap=plt.cm.gray)
plt.show()
```

### References:

1. [Dicom Standard](https://www.dicomstandard.org/)
2. [Weasis](https://nroduit.github.io/en/)
3. [MicroDicom](https://www.microdicom.com/)
4. [Jack Imaging Viewer](https://beta.jackimaging.com/demo)
5. [pydicom documentation](https://pydicom.github.io/pydicom/stable/index.html)
6. [Understanding DICOM (an article explaining the DICOM format)](https://towardsdatascience.com/understanding-dicom-bce665e62b72)

Layan Alabdullatef
