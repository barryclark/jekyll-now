const fs = require('fs');

const folderPath = '_includes/_shared_block'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/Block.json'; // 결과를 저장할 Markdown 파일 경로

// 결과를 저장할 배열
dataList = []; // 결과를 저장할 배열

/**
 * 디렉토리를 순환하며 파일의 경우 콜벡을 호출합니다.
 */
function circuitDirectory(curruntPath, callback) {
    fs.readdirSync(curruntPath).forEach((name) => {
        const filePath = `${curruntPath}/${name}`;
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            circuitDirectory(filePath, callback);
        } else {
            callback(filePath);
        }
    });
}
/**
 * path를 밭아 데이터를 변환하고 dataList에 추가합니다.
 */
function makeBlockData(path) {
    // path에서 마지막 '/'를 찾아 뒤의 문자를 반환하고, 확장자를 제거합니다.
    fileName = path.substring(path.lastIndexOf('/') + 1);
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));

    // 모든 디렉토리를 가져옵니다.
    tag = path.split('/');
    // 0, 1 디렉토리를 제거합니다.
    tag.shift();
    tag.shift();
    // 마지막 디렉토리를 제거합니다.
    tag.pop();

    dataList.push({
        Name: fileName,
        Tag: tag,
        Path: path,
    });
}

/**
 * 폴더 목록을 업데이트하고 결과를 출력하는 함수
 */
try {
    console.log('updateSharedBlockBlock: Start \n');

    circuitDirectory(folderPath, makeBlockData);
    const json = JSON.stringify(dataList, null, 2);
    fs.writeFileSync(outputPath, json);

    console.log('updateSharedBlockBlock: End \n');
} catch (err) {
    console.error(err);
    process.exit(1);
}
