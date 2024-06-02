import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Doc } from "@/types";
import { handleAlert, setLoading } from "../store";

export function useCrud() {
  async function handleAddDoc(
    collectionPath: string,
    data: any,
    successMessage: string | null = null,
    loadingMessage: string
  ) {
    try {
      setLoading(loadingMessage);
      const docRef = await addDoc(collection(db, collectionPath), {
        ...data,
      });

      if (successMessage) {
        handleAlert({ success: successMessage });
      }
      setLoading(null);
      return "success";
    } catch (error) {
      setLoading(null);
      handleAlert({ error });
    }
  }
  async function handleSetDoc(
    collectionPath: string,
    docId: string,
    data: any,
    successMessage: string | null = null,
    loadingMessage: string
  ) {
    try {
      setLoading(loadingMessage);
      await setDoc(
        doc(db, collectionPath, docId),
        {
          ...data,
        },
        { merge: true }
      );
      if (successMessage) {
        handleAlert({ success: successMessage });
      }

      setLoading(null);

      return "success";
    } catch (error) {
      setLoading(null);

      handleAlert({ error });
    }
  }
  async function handleDeleteDoc(
    collectionPath: string,
    docId: string,
    successMessage: string | null = null,
    loadingMessage: string
  ) {
    try {
      setLoading(loadingMessage);
      await deleteDoc(doc(db, collectionPath, docId));
      setLoading(null);
      if (successMessage) handleAlert({ success: successMessage });
    } catch (error) {
      setLoading(null);
      handleAlert({ error });
    }
  }
  async function handleGetDoc(
    collectionPath: string,
    docId: string,
    successMessage: string | null = null,
    loadingMessage: string
  ) {
    try {
      setLoading(loadingMessage);
      const docRef = doc(db, collectionPath, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (successMessage) {
          handleAlert({ success: successMessage });
        }
        setLoading(null);
        return docSnap.data();
      } else {
        setLoading(null);
        handleAlert({ info: "No such document!" });
      }
    } catch (error) {
      setLoading(null);
      handleAlert({ error });
    }
  }

  async function handleGetDocs(
    queryRef: any,
    successMessage: string | null = null,
    loadingMessage: string
  ) {
    try {
      setLoading(loadingMessage);
      const querySnapshot = await getDocs(queryRef);
      setLoading(null);

      let res: Doc[] = [];
      querySnapshot.forEach((doc) => {
        res.push({ data: doc.data(), id: doc.id });
      });
      if (res.length > 0) {
        if (successMessage) {
          handleAlert({ success: successMessage });
        }
      } else {
        handleAlert({ info: "no document found" });
      }
      return res;
    } catch (error) {
      setLoading(null);
      handleAlert({ error });
    }
  }

  return {
    handleSetDoc,
    handleDeleteDoc,
    handleGetDoc,
    handleGetDocs,
    handleAddDoc,
  };
}
