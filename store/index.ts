import { create } from "zustand";
import { FirebaseError } from "firebase/app";
import { AlertType, FormActionType, Doc } from "@/types";
import cloneDeep from "lodash.clonedeep";
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
  lowStockThreshold: number;
  user: { phoneNumber: string } | undefined;
}
export const useStore = create<Store>()(() => ({
  createEntryValues: { action: "create", data: [] },
  loading: null,
  alert: null,
  products: [],
  sales: [],
  purchases: [],
  categories: [],
  lowStockThreshold: 4,
  user: undefined,
}));

export const setCreateEntryValues = (createEntryValues: CreateEntryValues) =>
  useStore.setState({
    createEntryValues: cloneDeep(createEntryValues),
  });

export const setLowStockThreshold = (lowStockThreshold: number) =>
  useStore.setState({ lowStockThreshold });
export const setLoading = (loading: string | null) =>
  useStore.setState({ loading });
export const setProducts = (products: Doc[]) =>
  useStore.setState({ products: cloneDeep(products) });
export const setSales = (sales: Doc[]) =>
  useStore.setState({ sales: cloneDeep(sales) });
export const setPurchases = (purchases: Doc[]) =>
  useStore.setState({ purchases: cloneDeep(purchases) });
export const setCategories = (categories: Doc[]) =>
  useStore.setState({ categories: cloneDeep(categories) });
export const setUser = (user: { phoneNumber: string } | undefined) =>
  useStore.setState({ user: cloneDeep(user) });

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
