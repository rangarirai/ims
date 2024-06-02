import { Purchase } from "@/app/purchases/Form";
import { Sale } from "@/app/sales/Form";
import { db } from "@/firebase";
import { handleAlert, setLoading } from "@/store";
import {
  FieldValue,
  collection,
  doc,
  increment,
  writeBatch,
} from "firebase/firestore";

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
      let salesCollectionRef = doc(collection(db, `sales`));
      if (prev && saleId && editData) {
        batch.update(doc(db, `products`, editData?.productId), {
          inStock: increment(+prev - +editData?.quantity),
        });
        batch.update(doc(db, `sales`, saleId), {
          ...data,
        });
      } else if (data) {
        batch.update(doc(db, `products`, data?.productId), {
          inStock: increment(-+data?.quantity),
        });

        batch.set(salesCollectionRef, {
          ...data,
        });
      }

      await batch.commit();
      setLoading(null);
      handleAlert({ success: "sale or purchase created" });
      return "success";
    } catch (error) {
      setLoading(null);

      handleAlert({ error });
    }
  }
  async function createPurchase(
    data?: Purchase,
    editData?: EditSaleOrPurchase,
    prev?: string,
    purchaseId?: string
  ) {
    try {
      if (prev && purchaseId) {
      } else if (data?.purchasePrice) {
        setLoading("creating a purchase");
        let purchasesCollectionRef = doc(collection(db, `purchases`));
        const batch = writeBatch(db);
        batch.update(doc(db, `products`, data.productId), {
          inStock: increment(+data.quantity),
          purchasePrice: data?.purchasePrice,
        });
        batch.set(purchasesCollectionRef, {
          ...data,
        });
        await batch.commit();
        setLoading(null);
        handleAlert({ success: "purchase created" });
        return "success";
      }
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
