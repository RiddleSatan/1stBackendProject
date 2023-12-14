// const express = require("express");
// const path = require("path");
// const app = express();
// const bodyparser= require("body-parser");
// const port = 80;

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "9118380538",
//   database:"contacthogwart",
// });

// con.connect(function(err) {
//     console.log("Connected!");
//     con.query("create table hogwart(name varchar(20),phone_no. int,email varchar(50),address varchar(30),desc varchar(100))", function(err,result){
//         console.log("Table created successfully");
//         });
// });
 



// // EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded({extended : true}));

// // PUG SPECIFIC STUFF
// app.set('view engine', 'pug') // Set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory

// // ENDPOINTS
// app.get('/', (req, res)=>{
//     const params = {}
//     res.status(200).render('home.pug', params);
// })
// app.get('/contact', (req, res)=>{
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })

// // app.post('/contact', (req, res)=>{
// //     const contactData = {
// //     name: req.body.name,
// //     phone_no: req.body.phone_no,
// //     email: req.body.email,
// //     address: req.body.address,
// //     desc: req.body.desc,}
// //     var mydata=new contact(req.body); 
// //     mydata.save().then(()=>{  
// //         res.send("this data have beens saved to the database ")
// //     }).catch(()=>{
// //         res.status(400).send("item was  not saved to the database")
// //     });
// //     res.status(200).render('contact.pug', params);
// // })


// app.post('/contact', (req, res) => {
//     const contactData = {
//         name: req.body.name,
//         phone_no: req.body.age,
//         email: req.body.gender,
//         address: req.body.address,
//         desc: req.body.more,
//     };
//     con.query("INSERT INTO hogwart SET ?", contactData, function(err, result) {
//         if (err) {
//             console.error('Error creating contact:', err);
//             return res.status(500).json({ error: 'Failed to save contact' });
//         }
//         console.log('Contact created:', result);
//         res.send("This data has been saved to the database");
//     });
// });






// // START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });




const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser"); // body-parser package corrected here
const port = 80;

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9118380538",
  database: "riddle",
});

con.connect(function(err) {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database!");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS hogwart (
            name VARCHAR(20),
            phone_no INT,
            email VARCHAR(50),
            address VARCHAR(30),
            description VARCHAR(100)
        )
    `;

    con.query(createTableQuery, function(err, result) {
        if (err) {
            console.error("Error creating table:", err);
            return;
        }
        console.log("Table 'hogwart' created successfully");
    });
});
 
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({extended : true})); // bodyParser corrected here

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    const contactData = {
        name: req.body.name,
        phone_no: req.body.age, // corrected field name
        email: req.body.email, // corrected field name
        address: req.body.address,
        description: req.body.more, // corrected field name
    };
    con.query("INSERT INTO hogwart SET ?", contactData, function(err, result) {
        if (err) {
            console.error('Error creating contact:', err);
            return res.status(500).json({ error: 'Failed to save contact' });
        }
        console.log('Contact created:', result);
        res.send("This data has been saved to the database");
    });
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
