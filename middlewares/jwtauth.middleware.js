import JWT from "jsonwebtoken";

const jwtMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return next("Token not found, auth failed");
    }

    const token = authHeader.split(" ")[1];
    const payload = JWT.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log("payload", payload);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Aurhorization failed");
  }
};

export default jwtMiddleware;
