import { useCallback, useState } from "react";

import instance from "../utils/api";
import { URLS } from "../constants";

const useCategories = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [msg, setMsg] = useState("");

  const list = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(URLS.CATEGORIES);
      setData(data?.data?.data);
      return data.data.data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "something went wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = async () => {};

  const remove = async () => {};

  const update = async () => {};

  return {
    data,
    error,
    loading,
    msg,
    pagination,
    list,
    getById,
    remove,
    update,
  };
};

export default useCategories;
