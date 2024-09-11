import { FormProps } from "@/components/PageWrapper";
import PurchaseOrSale from "@/components/PurchaseOrSale";
import { FieldValue } from "firebase/firestore";

export type Purchase = {
  created: FieldValue;
  productId: string;
  purchasePrice: string;
  todayPurchasePrice: string;
  previousPurchasePrice: string;
  quantity: string;
  productName: string;
  productDescription: string;
};
// average cost method
export function averageCost(
  purchasePrice: string,
  inStock: string,
  todayPurchasePrice: string,
  quantity: string
) {
  return (
    (+purchasePrice * +inStock + +todayPurchasePrice * +quantity) /
    (+inStock + +quantity)
  );
}
function Form({ action, selectedDocument }: FormProps) {
  return (
    <PurchaseOrSale
      action={action}
      selectedDocument={selectedDocument}
      entity="purchase"
    />
  );
}

export default Form;
