import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//------------------------------------------- Registering a new User
export const registerUser = async (req, res) => {
  // on va hasher le mots de passe avec bcrypt
  const salt = await bcrypt.genSalt(10);
  // console.log("avant" + req.body.password);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  // console.log(`apres  ${req.body.password}`);
  // const newUser = new UserModel({ ...req.body });

  const newUser = new UserModel(req.body);
  const { email } = req.body;

  try {
    const userEmail = await UserModel.findOne({ email: email });
    // on cherche si le email est deja utilisé
    if (userEmail) 
    return res.status(400).json({ message: "Ce email est déja utilisé" });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWTKEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ user: user, token: token });
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err.message);
  }
   }



//-------------------------------------- login User

export const loginUser = async (req, res) => {
  // on recupère les informations du front
  const { email, password } = req.body; // du front end  email=req.body.email et password =req.body.password

  try {
    // on cherche le email qui correspond
    const user = await UserModel.findOne({ email: email });

    if (user) {
      // on compare le mot de passe du front au back end
      const validity = await bcrypt.compare(password, user.password);

      // si le mot de pass n'est  pas correct
      if (!validity) {
        res.status(400).json("mot de passe incorrect");
      } else {
        //sinon on assigne un token
        const token = jwt.sign({ id: user._id }, process.env.JWTKEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ user, token });
      }
    } else {
      // si on ne trouve pas l'user on envoie
      res.status(404).json("L'utilisateur n'existe pas");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
