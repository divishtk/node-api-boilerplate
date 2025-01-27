const userAuthMiddleware = (req, res, next) => {
  const { name, email, password } = req.body;

  /*if (!name || !email || !password) {
      return next("Please provide all the fields");
    }*/

  /* let requiredFields = {
    name: "Name is required",
    email: "Email is required",
    password: "Password is required",
  };

  for(let key in requiredFields){
    console.log('key',key)
    if(!req.body[key]){
        return next(requiredFields[key])
    }
  }*/

  let requiredFields = {
    name: "Name is required",
    email: "Email is required",
    password: "Password is required",
  };

  const missingFields = Object.keys(requiredFields).filter(
    (key) => !req.body[key]
  );
  console.log(missingFields);
  if (missingFields.length > 0) {
    const errorMessage = missingFields
      .map((key) => requiredFields[key])
      .join(" & ");
    return next(errorMessage);
  }

  if (password.length < 8) {
    return next("Password must be at least 8 characters long");
  }
  d;

  next(); // To call controller
};

export default userAuthMiddleware;
