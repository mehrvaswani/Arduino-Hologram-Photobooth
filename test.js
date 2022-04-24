const { storage } = require('firebase-admin');
const admin = require('firebase-admin');

//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

var serviceAccount = require('./service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "cs5041-9dcef.appspot.com",
});

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/jpeg');
    res.end('Hello World\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, async () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(admin);
    const bucket = admin.storage().bucket();

    for (var i = 0; i < 50; i++) {
        const files = await bucket.upload(`/Users/mehervaswani/Desktop/p5/downloads/${i}.jpeg`)
        const url = await files[0].getSignedUrl({ action: "read", expires: '03-01-2500' });
    }

    var a = document.createElement("a");
    a.href = `https://storage.googleapis.com/cs5041-9dcef.appspot.com/${i}.jpeg`;
    document.getElementById("href").appendChild(a);
});