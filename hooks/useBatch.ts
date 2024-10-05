import { Purchase } from "@/app/purchases/Form";
import { Sale } from "@/app/sales/Form";
import { db } from "@/firebase";
import { getDate, getMonth, getYear } from "@/helperFunctions";
import { handleAlert, setLoading } from "@/store";
import {
  FieldValue,
  collection,
  doc,
  increment,
  writeBatch,
} from "firebase/firestore";
export let saleCollectionPath = createPurchaseOrSaleCollectionPath(
  "sales",
  getYear(),
  getMonth() + 1,
  getDate()
);
export let purchaseCollectionPath = createPurchaseOrSaleCollectionPath(
  "purchases",
  getYear(),
  getMonth() + 1,
  getDate()
);
export function useBatch() {
  // firebase batches
  async function createSale(
    data?: Sale,
    editData?: EditSaleOrPurchase,
    prev?: string,
    saleId?: string
  ) {
    try {
      const batch = writeBatch(db);

      setLoading("creating a sale");
      let salesDocRef = doc(collection(db, saleCollectionPath));
      if (prev && saleId && editData) {
        batch.update(doc(db, `products`, editData?.productId), {
          inStock: increment(+prev - +editData?.quantity),
        });
        batch.update(doc(db, saleCollectionPath, saleId), {
          ...editData,
        });
      } else if (data) {
        batch.update(doc(db, `products`, data?.productId), {
          inStock: increment(-+data?.quantity),
        });

        batch.set(salesDocRef, {
          ...data,
        });
      }

      await batch.commit();
      setLoading(null);
      handleAlert({ success: "sale created or updated" });
      return "success";
    } catch (error) {
      setLoading(null);

      handleAlert({ error });
    }
  }
  async function createPurchase(
    data?: Purchase,
    editData?: EditSaleOrPurchase & { purchasePrice: string },
    prev?: string,
    purchaseId?: string
  ) {
    try {
      const batch = writeBatch(db);
      let purchasesDocRef = doc(collection(db, purchaseCollectionPath));
      if (prev && purchaseId && editData) {
        setLoading("updating a purchase");
        batch.update(doc(db, `products`, editData?.productId), {
          inStock: increment(-(+prev - +editData?.quantity)),
          purchasePrice: editData?.purchasePrice,
        });
        batch.update(doc(db, purchaseCollectionPath, purchaseId), {
          ...editData,
        });
      } else if (data?.purchasePrice) {
        setLoading("creating a purchase");
        batch.update(doc(db, `products`, data.productId), {
          inStock: increment(+data.quantity),
          purchasePrice: data?.purchasePrice,
        });
        batch.set(purchasesDocRef, {
          ...data,
        });
      }
      await batch.commit();
      setLoading(null);
      handleAlert({ success: "purchase created or updated" });
      return "success";
    } catch (error) {
      setLoading(null);

      handleAlert({ error });
    }
  }

  return { createSale, createPurchase };
}

export type EditSaleOrPurchase = {
  quantity: string;
  productId: string;
  lastEdited: FieldValue;
};

export function createPurchaseOrSaleCollectionPath(
  root: string,
  year: number | string,
  month: number | string,
  date: number | string
) {
  return `${root}/doc/${year}/doc/${month}/doc/${date}`;
}
