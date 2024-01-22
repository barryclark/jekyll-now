const fs = require('fs');
const path = require('path');

const folderPath = 'path/to/your/folder'; // 업데이트하려는 폴더의 경로
const outputPath = 'path/to/output.md'; // 결과를 저장할 Markdown 파일 경로

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const fileList = files
    .filter((file) => fs.statSync(path.join(folderPath, file)).isFile())
    .map((file) => `- ${file}`)
    .join('\n');

  fs.writeFileSync(outputPath, fileList, 'utf-8');
  console.log('Folder list updated successfully.');
});
