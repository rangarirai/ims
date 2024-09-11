import { FormProps } from "@/components/PageWrapper";
import PurchaseOrSale from "@/components/PurchaseOrSale";
import { FieldValue } from "firebase/firestore";

export type Sale = {
  created: FieldValue;
  productId: string;
  profit: string;
  quantity: string;
  productName: string;
  productDescription: string;
};

function Form({ action, selectedDocument }: FormProps) {
  return (
    <PurchaseOrSale
      action={action}
      selectedDocument={selectedDocument}
      entity="sale"
    />
  );
}

export default Form;
