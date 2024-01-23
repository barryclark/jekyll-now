/**
 * 폴더 목록을 업데이트하는 스크립트
 */

const fs = require('fs');
const path = require('path');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/tag.md'; // 결과를 저장할 Markdown 파일 경로

/**
 * folderPath아래의 모든 폴더를 탐색하며 파일 목록을 반환하는 함수
 * 디렉토리들의 이름을 반환합니다.
 */
function readFilesInDirectory(dir) {
    const files = fs.readdirSync(dir);
    const fileList = [];

    // 폴더 아래의 모든 파일을 탐색
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // 디렉토리의 이름을 fileList에 추가합니다
        if (stat.isDirectory()) {
            fileList.push(file);

            // 디렉토리 아래의 파일들을 재귀적으로 탐색합니다.
            const subFiles = readFilesInDirectory(filePath);
            fileList.push(...subFiles.map(subFile => subFile));
        }
    });
    return fileList;
}

/**
 * 폴더 목록을 업데이트하고 결과를 출력하는 함수
 */
try {
    const fileList = readFilesInDirectory(folderPath).join('   \n');
    fs.writeFileSync(outputPath, fileList, 'utf-8');
    console.log('Folder list updated successfully. \n' + fileList);
} catch (err) {
    console.error(err);
    process.exit(1);
}
