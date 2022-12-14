
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; 

// ---------- MIDDLEWARES ----------
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/storage'));

// ---------- ROUTE ----------
app.use("/api", require("./routes")); 

// ---------- SERVER ----------
app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
});
