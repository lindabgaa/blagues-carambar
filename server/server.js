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
app.use("/api", jokeRoutes);
swagger(app);

app.get("/api", (req, res) => {
  const response = {
    message: "Bienvenue sur l'API de blagues Carambar!",
    description:
      "Cette API permet de gérer une collection de blagues Carambar.",
    endpoints: {
      randomJoke: {
        method: "GET",
        path: "/api/blagues/random",
        description: "Récupérer une blague aléatoire.",
      },
      allJokes: {
        method: "GET",
        path: "/api/blagues",
        description: "Lister toutes les blagues disponibles.",
      },
      getJokeById: {
        method: "GET",
        path: "/api/blagues/:id",
        description: "Récupérer une blague précise en utilisant son ID.",
      },
      addJoke: {
        method: "POST",
        path: "/api/blagues",
        description: "Ajouter une nouvelle blague.",
      },
    },
    documentation: {
      url: "/api-docs",
      description: "Consultez la documentation de l'API ici.",
    },
    version: "1.0.0",
  };

  res.json(response);
});

sequelize
  .sync()
  .then(() => {
    console.log("La base de données est synchronisée ! ");
    app.listen(PORT, () => {
      console.log(`Le serveur est lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(
      "Erreur lors de la synchronisation de la base de donnée :",
      err
    );
  });
