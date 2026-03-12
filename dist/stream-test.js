import * as fs from "node:fs";
const fileName = "big-file.txt";
const fileStream = fs.createWriteStream(fileName);
for (let i = 0; i < 100000; i++) {
    fileStream.write(`Dòng thứ ${i}: Chào Hải, đây là dữ liệu mẫu để test Stream trong Node.js\n`);
}
;
fileStream.end();
fileStream.on("finish", () => {
    console.log("Tao file test thanh cong!");
    const readStream = fs.createReadStream(fileName, {
        encoding: 'utf-8',
        highWaterMark: 1024,
    });
    let chunkCount = 0;
    readStream.on("data", (chunk) => {
        chunkCount++;
        console.log(`--- Đang nhận chunk thứ ${chunkCount} (Độ dài: ${chunk.length} ký tự) ---`);
        // Giả sử ta chỉ xử lý dữ liệu ở đây mà không lưu hết vào RAM
    });
    readStream.on('end', () => {
        console.log('🏁 Đã đọc xong toàn bộ file bằng Stream!');
        // Xóa file sau khi test xong
        fs.unlinkSync(fileName);
    });
    readStream.on('error', (err) => {
        console.error('❌ Lỗi khi đọc file:', err.message);
    });
});
