#!/usr/bin/env python

import exifread
import os
import json

# Relative directories
photo_dir = "assets/photography"
output_file = "_data/album_data.json"

if os.path.isfile(output_file):
    print("Deleting existing album_data.json file")
    os.remove(output_file)

output_list = []
album_cnt = 0
photo_cnt = 0

for album in os.listdir(photo_dir):

    album_cnt += 1
    photos = []

    for file in os.listdir(f"{photo_dir}/{album}"):

        photo_cnt += 1

        with open(f"{photo_dir}/{album}/{file}", 'rb') as f:
            tags = exifread.process_file(f)
            if "Image ImageDescription" in tags and tags["Image ImageDescription"].values.strip() != '':
                description = tags["Image ImageDescription"].values
            else:
                description = None

        photos.append({
            "filename": file,
            "path": f"{photo_dir}/{album}/{file}",
            "description": description
        })

    album_data = {
        "name": album,
        "path": f"{photo_dir}/{album}",
        "photos": photos
    }

    output_list.append(album_data)

with open(output_file, 'w') as f:
    json.dump(output_list, f, indent=True)

print("Great success!")
print(f"Added {album_cnt} albums with {photo_cnt} photos")
