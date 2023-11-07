import { useCallback, useState } from "react";

import instance from "../utils/api";
import { URLS } from "../constants";

const useProduct = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [msg, setMsg] = useState("");

  const list = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(URLS.PRODUCTS);
      setData(data?.data?.data);
      return data?.data?.data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload) => {
    try {
      setLoading(true);
      const { data } = await instance.post(URLS.PRODUCTS, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(data?.data);
      return data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const getById = async () => {};

  const remove = async () => {};

  const update = async () => {};

  return {
    data,
    error,
    loading,
    msg,
    pagination,
    create,
    list,
    getById,
    remove,
    update,
  };
};

export default useProduct;
