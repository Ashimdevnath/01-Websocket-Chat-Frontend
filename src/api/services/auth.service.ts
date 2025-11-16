import client from "../client";
import { API } from "../endpoints";

export const login = (data: { email: string; password: string }) =>
  client.post(API.AUTH.LOGIN, data);

export const signup = (data: any) =>
  client.post(API.AUTH.SIGNUP, data);

export const getProfile = () => client.get(API.AUTH.PROFILE);
