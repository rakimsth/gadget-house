import API from "../utils/api";
import { URLS } from "../constants";

export const list = () => {
  return API.get(URLS.PRODUCTS);
};

export const getById = (id) => {
  return API.get(URLS.PRODUCTS + `/${id}`);
};
