const http = require("http");
const fs = require("fs");
const path = "./files";

const host = "localhost";
const port = 8000;

let files;

const requestListener = (req, res) => {
  if (req.method === "GET") {
    switch (req.url) {
      case "/get":
        try {
          files = fs.readdirSync(path);
        } catch (err) {
          console.log(err);
        }
        if (files) {
          res.writeHead(200);
          res.end(files.join(","));
        } else {
          res.writeHead(500);
          res.end("Internal server error");
        }
        break;
      case "/delete":
      case "/post":
        res.writeHead(200);
        res.end("success");
        break;

      case "/redirect":
        res.writeHead(301, { Location: "/redirected" });
        res.end();
        break;
      default:
        res.writeHead(405);
        res.end("HTTP method not allowed");
    }
  } else {
    res.writeHead(405);
    res.end("HTTP method not allowed");
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
