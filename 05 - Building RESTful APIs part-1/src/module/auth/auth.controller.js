import APIResponses from "../../src/common/utils/api-res.js";
import * as authService from "./auth.service.js";

const register = async () => {
  const user = await authService.register(req.body);
  APIResponses.created(res, "registeration success", user);
};

export { register };
