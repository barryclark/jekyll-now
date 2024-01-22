const fs = require('fs');
//const path = require('path');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/tag.md'; // 결과를 저장할 Markdown 파일 경로

await fs.writeFileSync(outputPath, 'test'); // 결과를 저장할 Markdown 파일 생성
