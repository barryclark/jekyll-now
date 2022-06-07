# Visualization Technique

---

---

## Image

Display a numpy 2d matrix

(it represents an image, each value is between 0,255 (Grey scale)) 

```python
# e.g.  train_images.shape : (100, 100)
# Each value is 0~255 (because grey scale)

plt.figure()
plt.imshow(train_images[0])
plt.colorbar()
plt.grid(False)
plt.show()
```