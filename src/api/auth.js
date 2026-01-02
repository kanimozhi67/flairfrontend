import axiosClient from "./axiosClient";

export const signup = (data) =>
  axiosClient.post("/auth/signup", data);

export const studentSignup = (data) =>
  axiosClient.post("/auth/studentSignup", data);

export const login = (data) =>
  axiosClient.post("/auth/login", data);

export const studentlogin = (data) =>
  axiosClient.post("/auth/studentlogin", data);

export const teacherlogin = (data) =>
  axiosClient.post("/auth/teacherlogin", data);

export const logout = () =>
  axiosClient.post("/auth/logout");

export const getMe = () =>
  axiosClient.get("/auth/getMe");

export const todaytask = () =>
  axiosClient.get("/users/todaytask");

export const completeTask = (payload) => {
  return axiosClient.post("/users/completetask", payload);
};

export const today = () =>
  axiosClient.get("/quiz/progress/today");

export const addPoints = () =>
  axiosClient.get("/quiz/progress/addpoints");

export const summary = () =>
  axiosClient.get("/quiz/progress/summary");


  export const addStickerToUser = async (userId, sticker) => {
  return await axiosClient.post(`/users/${userId}/stickers`, { sticker });
};


