import { createServer } from "node:http";
const PORT = 3000;
const server = createServer((req, res) => {
    const { method, url } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    if (url === '/' && method === 'GET') {
        res.writeHead(200, {
            'content-type': 'text/plain; charset=utf-8'
        });
        res.end("Good morning!");
    }
    else if (url === '/api/user' && method === 'GET') {
        const userData = {
            id: 1,
            name: 'Lâm Nguyễn Thanh Hải',
            role: 'Frontend Engineer learning Backend'
        };
        res.writeHead(200, {
            "content-type": "application/json"
        });
        res.end(JSON.stringify(userData));
    }
    else {
        res.writeHead(404, {
            "content-type": "text/plain"
        });
        res.end('404 Not Found!');
    }
    ;
});
server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
