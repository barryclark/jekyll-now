/**
 * 폴더 목록을 업데이트하는 스크립트
 */

const fs = require('fs');
const path = require('path');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/tag.md'; // 결과를 저장할 Markdown 파일 경로

/**
 * folderPath아래의 모든 폴더를 탐색하며 파일 목록을 반환하는 함수
 * 디렉토리와 파일의 확장자를 포함하지 않고 파일의 이름만 반환함
 */
function readFilesInDirectory(dir) {
  const files = fs.readdirSync(dir);
  const fileList = [];

  // 폴더 아래의 모든 파일을 탐색
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileList.push(...readFilesInDirectory(filePath));
    } else {
      // 파일이름에서 확장자를 제거하고 파일 목록에 추가
      const fileName = file.split('.')[0];
      fileList.push(fileName);
    }
  });
  return fileList;
}

/**
 * 폴더 목록을 업데이트하고 결과를 출력하는 함수
 */ 
try {
  const fileList = readFilesInDirectory(folderPath).join('\n');
  fs.writeFileSync(outputPath, fileList, 'utf-8');
  console.log('Folder list updated successfully. \n' + fileList);
} catch (err) {
  console.error(err);
  process.exit(1);
}
