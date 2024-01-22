const fs = require('fs');
const path = require('path');

// 
const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/tag.md'; // 결과를 저장할 Markdown 파일 경로

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const fileList = files
    .filter((file) => fs.stat(path.join(folderPath, file)).isFile())
    .map((file) => `- ${file}`)
    .join('\n');

  fs.writeFile(outputPath, fileList, 'utf-8', (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Folder list updated successfully.');
  });
});
