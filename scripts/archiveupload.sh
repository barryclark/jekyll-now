#!/bin/bash
# Requirements debian like:
# https://github.com/prasmussen/gdrive (download and execute)
# apt-get install jpegoptim
# apt-get install optipng
# apt-get install libimage-exiftool-perl
# pip install internetarchive (https://github.com/jjjake/internetarchive)
gdrive download 0B3_1qNRcoeWseTlOejNUaFlpMjQ --recursive --force

find "${1:-TerremotoCentroItalia_foto}" -type f -name '*.*' | while IFS= read -r FILE; do
        d=$(dirname "$FILE")
        FILE_CLEAN=$(echo $FILE | tr "'" "_" | tr " " "_" | tr "," "_" | sed -r 's|\.|_|g; s|_([^_]*)$|.\1|')
        FILE_BASE256=$(sha256sum "$FILE")
        FILE_BASE256_EXT=$(echo $FILE_BASE256 | awk '{print $1}')".${FILE_CLEAN#*.}"
        mv "$FILE" "$d/$FILE_BASE256_EXT"
        jpegoptim "$d/$FILE_BASE256_EXT"
        optipng "$d/$FILE_BASE256_EXT"
        exiftool -m -UserComment="$FILE" "$d/$FILE_BASE256_EXT"
        ia upload terremotocentroitaliainfo "$d/$FILE_BASE256_EXT" --retries 10
done
