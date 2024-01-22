const fs = require('fs');
const path = require('path');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/generated/tag.md'; // 결과를 저장할 Markdown 파일 경로

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const fileList = [];

  // 비동기 방식으로 파일 상태를 확인하고 목록을 생성
  let processedFiles = 0;
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (statErr, stats) => {
      if (statErr) {
        console.error(statErr);
      } else if (stats.isFile()) {
        fileList.push(`- ${file}`);
      }

      processedFiles++;

      // 모든 파일을 처리한 후에 작업을 완료
      if (processedFiles === files.length) {
        const fileContent = fileList.join('\n');
        
        // 비동기 방식으로 파일 작성
        fs.writeFile(outputPath, fileContent, 'utf-8', (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
          } else {
            console.log('Folder list updated successfully. \n' + fileContent);
          }
        });
      }
    });
  });
});
