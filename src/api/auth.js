import axiosClient from "./axiosClient";

export const signup = (data) =>
  axiosClient.post("/auth/signup", data);

export const login = (data) =>
  axiosClient.post("/auth/login", data);

export const logout = () =>
  axiosClient.post("/auth/logout");

export const getMe = () =>
  axiosClient.get("/auth/getMe");

export const quiz = () =>
  axiosClient.get("/quiz/math");

export const today = () =>
  axiosClient.get("/quiz/progress/today");

export const addPoints = () =>
  axiosClient.get("/quiz/progress/addpoints");

export const summary = () =>
  axiosClient.get("/quiz/progress/summary");


  export const addStickerToUser = async (userId, sticker) => {
  return await axiosClient.post(`/users/${userId}/stickers`, { sticker });
};


