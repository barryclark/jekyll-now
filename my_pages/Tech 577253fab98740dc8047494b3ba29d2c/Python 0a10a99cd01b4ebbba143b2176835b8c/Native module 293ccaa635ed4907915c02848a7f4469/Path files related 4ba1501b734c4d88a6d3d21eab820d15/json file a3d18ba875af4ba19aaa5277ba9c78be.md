# json file

## Write to json

```python
# Directly from dictionary
map_file_path = os.path.join(MODEL_OUTPUT_DIR, ID_LABEL_MAP_FILENAME)
# In case folder not exist...
os.makedirs(os.path.dirname(map_file_path), exist_ok=True)
json_file_content = {"id2label": id2label, "label2id": label2id}
with open(map_file_path, 'w') as outfile:
    json.dump(json_file_content, outfile, ensure_ascii=False)
```

## Read from json

```python
with open(map_file_path) as f:
    id_label_map = json.load(f)
```