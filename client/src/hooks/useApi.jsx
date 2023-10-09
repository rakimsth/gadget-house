import { useCallback, useState } from "react";
import axios from "axios";
import { URLS } from "../constants";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const create = async ({ url, payload }) => {
    try {
      setLoading(true);
      await axios.post(url, payload);
    } catch (e) {
      const err = e ? e.message : "Create API Failed";
      setError(err);
    } finally {
      list({ url: URLS.PRODUCTS });
      setLoading(false);
    }
  };
  const list = useCallback(async ({ url }) => {
    try {
      setLoading(true);
      const { data } = await axios(url);
      setData(data);
    } catch (e) {
      const err = e ? e.message : "List API Failed";
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async ({ url, id, payload }) => {
    try {
      const API_URL = url + "/" + id;
      setLoading(true);
      await axios.patch(API_URL, payload);
    } catch (e) {
      const err = e ? e.message : "Update Failed";
      setError(err);
    } finally {
      list({ url: URLS.PRODUCTS });
      setLoading(false);
    }
  };

  const deleteById = async ({ url, id }) => {
    try {
      const API_URL = url + "/" + id;
      setLoading(true);
      await axios.delete(API_URL);
    } catch (e) {
      const err = e ? e.message : "Delete API Failed";
      setError(err);
    } finally {
      list({ url: URLS.PRODUCTS });
      setLoading(false);
    }
  };

  return { loading, error, data, create, list, updateStatus, deleteById };
}
