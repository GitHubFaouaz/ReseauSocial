import mongoose from "mongoose"; // Plugin Mongoose pour se connecter à la data base Mongo Db
import dotenv from "dotenv";
dotenv.config();
mongoose

  .connect(
    process.env.DB_USER_PASS,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    console.log(`Connexion à MongoDB réussie au port ${process.env.PORT}`)
  )
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));
