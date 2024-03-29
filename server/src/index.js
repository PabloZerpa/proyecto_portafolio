
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
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/aplicaciones", require("./routes/aplicaciones"));
app.use("/api/basedatos", require("./routes/bases_datos"));
app.use("/api/servidores", require("./routes/servidores"));
app.use("/api/custodios", require("./routes/custodios"));

// ---------- SERVER ----------
app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
});
