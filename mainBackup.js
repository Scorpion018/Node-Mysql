var express = require("express");
var mysql = require("mysql");
var http = require("http");
var ejs = require("ejs");
var url = require("url");
// const os = require('os');
const { MongoClient, ServerApiVersion } = require("mongodb");

var port = 8080;
var app = express();

// var free_memory = os.freemem();
// var free_mem_in_kb = free_memory/1024;
// var free_mem_in_mb = free_mem_in_kb/1024;
// var free_mem_in_gb = free_mem_in_mb/1024;

// free_mem_in_kb = Math.floor(free_mem_in_kb);
// free_mem_in_mb = Math.floor(free_mem_in_mb);
// free_mem_in_gb = Math.floor(free_mem_in_gb);

// free_mem_in_mb = free_mem_in_mb%1024;
// free_mem_in_kb = free_mem_in_kb%1024;
// free_memory = free_memory%1024;

// console.log("Free memory: " + free_mem_in_gb + "GB "
// + free_mem_in_mb + "MB " + free_mem_in_kb
// + "KB and " + free_memory + "Bytes");

// app.get('*', function (req, res) {
// const protocol = req.protocol;
// const host = req.hostname;
// const url = req.originalUrl;
// // const port = process.env.PORT || PORT;

// const fullUrl = `${protocol}://${host}:${port}${url}`

// const responseString = `Full URL is: ${fullUrl}`;
// // res.send(responseString);

// console.log(responseString)
// })

const uri =
    "mongodb+srv://vishugowda:Vishu@018@cluster0.roqlusf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

// console.log('OS' , os.version())

app.set("view engine", "ejs");
app.use(express.static("public"));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vishu@018",
    database: "test",
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to mySQL");
});

app.get("/", (req, res) => {
    res.sendFile("./index.html", {
        root: __dirname,
    });
});

app.get("/test", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    sql = `select * from records where name ='${queryObject.name}' or pincode = '${queryObject.pin}'`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || queryObject.name === undefined) {
            res.send("No data found  ");
        } else {
            res.render("Main", {
                path: results,
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Listing to the post ${port}`);
});

// http.createServer(function (req, res) {

// // HTTP Status: 200 : OK
// // Content Type: text/html
// res.writeHead(200, {'Content-Type': 'text/html'});

// // Send the response body as "Hello World!"
// res.end('Hello World!');

// }).listen(8080);
