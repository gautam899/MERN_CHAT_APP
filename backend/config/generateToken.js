import jwt from "jsonwebtoken";

// Here we will be generating JWT token for user authentication and also als set the expriy time of the token.
//In our case the token will expire in 30 days.
const generateToken = (id) => {
  return jwt.sign({ id },`${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "30d",
  });
};
export default generateToken;
