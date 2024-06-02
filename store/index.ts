import { create } from "zustand";
import { FirebaseError } from "firebase/app";
import { AlertType, FormActionType, Doc } from "@/types";
export type CreateEntryValues = {
  data: Doc[];
  action: FormActionType;
};
interface Store {
  createEntryValues: CreateEntryValues;
  loading: string | null;
  alert: AlertType | null;
  products: Doc[];
  sales: Doc[];
  purchases: Doc[];
  categories: Doc[];
}
export const useStore = create<Store>()(() => ({
  createEntryValues: { action: "create", data: [] },
  loading: null,
  alert: null,
  products: [],
  sales: [],
  purchases: [],
  categories: [],
}));

export const setCreateEntryValues = (createEntryValues: CreateEntryValues) =>
  useStore.setState({
    createEntryValues: structuredClone(createEntryValues),
  });

export const setLoading = (loading: string | null) =>
  useStore.setState({ loading });
export const setProducts = (products: Doc[]) =>
  useStore.setState({ products: structuredClone(products) });
export const setSales = (sales: Doc[]) =>
  useStore.setState({ sales: structuredClone(sales) });
export const setPurchases = (purchases: Doc[]) =>
  useStore.setState({ purchases: structuredClone(purchases) });
export const setCategories = (categories: Doc[]) =>
  useStore.setState({ categories: structuredClone(categories) });

export async function handleAlert(alertMessage: AlertType) {
  const { success, info, error, close } = alertMessage;
  if (error) {
    if (error instanceof FirebaseError) {
      setAlert({ error: error.message || error.code });
    } else {
      setAlert({ error });
    }
  }
  if (success) {
    setAlert({ success });
  }
  if (info) {
    setAlert({ info });
  }
  if (close) {
    setAlert(null);
  }
}

//inhouse
const setAlert = (alert: AlertType | null) => useStore.setState({ alert });
