
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

// ---------- MIDDLEWARES ----------
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({ secret: '123456', resave: true, saveUninitialized: true }));
 
// ---------- ROUTE ----------
app.use("/api/login", require("./routes/login"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/user", require("./routes/user"));
// app.use("/api", require("./routes"));

// ---------- SERVER ----------
app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
});
