import { FirebaseError } from "firebase/app";
export type FormActionType = "create" | "update" | "none";
export type AlertType = {
  success?: string;
  info?: string;
  error?: FirebaseError | string | any;
  close?: boolean;
};

export type Doc = {
  data: any;
  id: string;
  selected?: boolean;
};

export type QueryInfo = {
  field?: string | null;
  value?: string;
};

export type ProductFilter = {
  name: string;
  category: string;
  color: string;
  size: string;
};
