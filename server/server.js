const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

// Configuration CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
