const fs = require('fs');
const path = require('path');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/tag.md'; // 결과를 저장할 Markdown 파일 경로

function readFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  const fileList = [];
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      fileList.push(`- ${filePath}`);
    } else if (stats.isDirectory()) {
      fileList.push(`# ${filePath}`);
      fileList.push(...readFilesInDirectory(filePath)); // 하위 디렉토리 탐색
    }
  });

  return fileList;
}

try {
  const fileList = readFilesInDirectory(folderPath).join('\n');
  fs.writeFileSync(outputPath, fileList, 'utf-8');
  console.log('Folder list updated successfully. \n' + fileList);
} catch (err) {
  console.error(err);
  process.exit(1);
}
