const express = require("express");
const cors = require("cors");
const swagger = require("./config/swagger");

const sequelize = require("./config/database.js");
const jokeRoutes = require("./routes/jokeRoutes.js");

const app = express();
const PORT = process.env.PORT || 8080;

// Configuration CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1", jokeRoutes);
swagger(app);

app.get("/", (req, res) => {
  res.send(
    "Bienvenue sur l'API de blagues Carambar ! Consultez /api/v1/docs pour voir la documentation complète."
  );
});

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});
