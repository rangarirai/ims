import { Theme } from "@mui/material";
import { Timestamp } from "firebase/firestore";
export function getColor(theme: Theme, index: number) {
  let color = index % 2 === 0 ? "grey.200" : "grey.300";
  let res = theme.palette.mode === "dark" ? null : color;
  return res;
}
function toDate(firestoreDate: Timestamp) {
  return new Timestamp(
    firestoreDate?.seconds,
    firestoreDate?.nanoseconds
  ).toDate();
}
export function toJSDate(time: Timestamp | string) {
  if (typeof time === "string") {
    return new Date(time);
  } else {
    return toDate(time);
  }
}


export function formatData(data: any) {
  let dataTemp = structuredClone(data);
  dataTemp.created = toJSDate(dataTemp?.created).toLocaleString();
  dataTemp.lastEdited = toJSDate(dataTemp?.lastEdited).toLocaleString();
  return dataTemp;
}