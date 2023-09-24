const { verifyJWT } = require("./jwt");

const compareRoles = (user_perm, access_perm) => {
  if (access_perm.length == 0) return true;
  return user_perm.some((v) => access_perm.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  return (req, res, next) => {
    const bearerToken = req?.headers?.authorization;
    if (!bearerToken) throw new Error("Acess Token is required");
    const token = bearerToken.split("Bearer ")[1];
    const tokenData = verifyJWT(token);
    if (!tokenData) throw new Error("Token invalid");
    const { data } = tokenData;
    const isAllowed = compareRoles(data.roles, roles ?? []);
    if (!isAllowed) throw new Error("User Unauthorized");
    next();
  };
};

module.exports = secureAPI;
