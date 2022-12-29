
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// ---------- MIDDLEWARES ----------
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
 
// ---------- ROUTE ----------
app.use("/api/login", require("./routes/login"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/user", require("./routes/user"));

// ---------- SERVER ----------
app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
});
