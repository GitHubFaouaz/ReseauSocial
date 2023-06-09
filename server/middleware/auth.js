// const jwt = require("jsonwebtoken"); //pour verifier les token

// module.exports = (req, res, next) => {
//   try {
//     //étant donné que de nombreux problèmes peuvent se produire, nous insérons tout à l'intérieur d'un bloc try...catch
//     const token = req.headers.authorization.split(" ")[1]; //nous extrayons le token du header Authorization de la requête entrante ,avec  split pour récupérer tout après l'espace dans le header  on a bearer[0] ensuite le token[1] comme 2eme element que l'on va recuperer
//     const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //nous utilisons ensuite la fonction verify pour décoder notre token(objet javascript apres decodage)
//     const userId = decodedToken.userId; //nous extrayons l'ID utilisateur de notre token ;
//     if (req.body.userId && req.body.userId !== userId) {
//       // si la demande contient un ID utilisateur(req.body.userId), nous le (req.body.userId) comparons à celui extrait du token (userId)
//       throw "Invalid user ID"; //S'ils sont différents, nous générons une erreur , throw pour renvoyer l'erreur
//     } else {
//       //dans le cas contraire, tout fonctionne, et notre utilisateur est authentifié
//       next(); //Nous passons l'exécution à l'aide de la fonction next() .
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//il y aura un controle du token a chaque resquest
const secret = process.env.JWTKEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // split pour diviser un par un  et avec join pour assembler ains on ecite les espaces
    console.log(token);
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.body._id = decoded?.id; // on verifi apres decodage si le userId de user actuel est == au userId decodeé
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;
