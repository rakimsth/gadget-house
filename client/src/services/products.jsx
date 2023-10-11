import API from "../utils/api";
import axios from "axios";
import { URLS } from "../constants";

export const list = () => {
  return axios("https://fakestoreapi.com/products");
};

export const getById = (id) => {
  return API.get(URLS.PRODUCTS + `/${id}`);
};
