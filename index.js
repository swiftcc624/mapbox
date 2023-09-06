const http = require("http");
const fs = require("fs");
const path = require("path");

// const baseDir = "/home/rover/projects/z/mapbox/";

const baseDir = path.join(__dirname, "/");
console.log(baseDir);

const server = http.createServer((req, res) => {
  // Determine the file extension of the requested file
  const ext = path.extname(req.url);

  // Serve HTML files as text/html
  if (ext === ".html") {
    fs.readFile(baseDir + req.url, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  // Serve JavaScript files as text/javascript
  else if (ext === ".geojson" || ext === ".json") {
    fs.readFile(baseDir + req.url, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/content" });
        res.end(data);
      }
    });
  }
  // Return a 404 error for other file types
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
