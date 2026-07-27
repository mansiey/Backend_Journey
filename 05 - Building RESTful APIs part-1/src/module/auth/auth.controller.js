import APIResponses from "../../src/common/utils/api-res.js";
import * as authService from "./auth.service.js";

const register = async (req, res) => {
  const user = await authService.register(req.body);
  APIResponses.created(res, "registeration success", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  //abb cooki req me hoga ya res me? =? user ne login kar liya toh abb cokkie hum response me denge
  res.cookie('RefreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //can also be send with the ApiResponse
  res.cookie('AccessToken', accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000,
  });

  APIResponses.ok(res, "Login success", { user, accessToken});
}; 

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie('RefreshToken');
  APIResponses.ok(res, "Logout Successful");
};

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);

  APIResponses.ok(res, "This is the requested Profile", user);
}

export { register, login, logout, getMe };
