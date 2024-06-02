import { setCategories, setProducts, setPurchases, setSales } from "@/store";
import { ProductFilter, QueryInfo } from "@/types";
import {
  CollectionReference,
  DocumentData,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCrud } from "./useCrud";

export function useQuery() {
  const { handleGetDocs, handleGetDoc, handleAddDoc } = useCrud();

  async function getDocs(
    queryInfo: QueryInfo,
    collectionName: string,
    loadingMessage: string
  ) {
    let queryRef = null;
    const collectionRef = collection(db, collectionName);
    if (queryInfo?.field) {
      queryRef = query(
        collectionRef,
        where(queryInfo.field, "==", queryInfo.value),
        orderBy("created", "desc")
      );
    } else {
      queryRef = query(collectionRef, orderBy("created", "desc"));
    }
    let res = await handleGetDocs(queryRef, null, loadingMessage);
    switch (collectionName) {
      case "categories":
        setCategories(res || []);
        break;
      case "products":
        setProducts(res || []);
        break;
      case "sales":
        setSales(res || []);
        break;
      case "purchases":
        setPurchases(res || []);
        break;

      default:
        break;
    }
  }
  async function filterProducts(data?: ProductFilter, category = "") {
    let queryRef = null;
    const collectionRef = collection(db, "products");
    if (category) {
      queryRef = categoryFilter(collectionRef, category);
    }
    if (data) {
      queryRef = allFilters(collectionRef, data);
    }
    let res = await handleGetDocs(queryRef, null, "getting product");
    setProducts(res || []);
  }
  return {
    getDocs,
    filterProducts,
  };
}

let allFilters = (
  collectionRef: CollectionReference<DocumentData, DocumentData>,
  data: ProductFilter
) => {
  return query(
    collectionRef,
    where("name", "==", data.name),
    where("category", "==", data.category),
    where("color", "==", data.color),
    where("size", "==", data.size)
  );
};

let categoryFilter = (
  collectionRef: CollectionReference<DocumentData, DocumentData>,
  category: string
) => {
  return query(collectionRef, where("category", "==", category));
};
