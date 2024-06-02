import FlatSelect from "@/components/FlatSelect";
import { FormProps } from "@/components/PageWrapper";
import { useCrud } from "@/hooks/useCrud";
import { FormActionType } from "@/types";
import { Button, Stack, TextField } from "@mui/material";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
export type Price = {
  purchasePrice: string;
  salePrice: string;
  quantity: string;
};
export type Poduct = {
  name: string;
  category: string;
  color: string;
  size: string;
  purchasePrice: string;
  profit: string;
  inStock: number;
  created: FieldValue;
};

function Form({ action, selectedDocument, optionalData }: FormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [profit, setProfit] = useState("");
  const [inStock, setInStock] = useState("");
  const { handleAddDoc, handleSetDoc } = useCrud();
  async function handleSubmit(action: FormActionType) {
    let product: Poduct = {
      name: name.trim(),
      category: category.trim(),
      color: color.trim(),
      size: size.trim(),
      purchasePrice: purchasePrice.trim(),
      inStock: +inStock.trim(),
      profit: profit.trim(),
      created: serverTimestamp(),
    };

    switch (action) {
      case "create":
        let res = await handleAddDoc(
          "products",
          product,
          "product added",
          "adding product"
        );
        if (res === "success") {
          //reset values
          setFormValues("", "", "", "", "", "", "");
        }
        break;
      case "update":
        await handleSetDoc(
          "products",
          selectedDocument?.id || "",
          product,
          "product info updated",
          "updating product info"
        );
        break;

      default:
        break;
    }
  }
  function setFormValues(
    name: string,
    category: string,
    color: string,
    size: string,
    purchasePrice: string,
    profit: string,
    inStock: string
  ) {
    setName(name);
    setCategory(category);
    setColor(color);
    setSize(size);
    setPurchasePrice(purchasePrice);
    setProfit(profit);
    setInStock(inStock);
  }
  useEffect(() => {
    if (selectedDocument) {
      setFormValues(
        selectedDocument?.data.name,
        selectedDocument?.data.category,
        selectedDocument?.data.color,
        selectedDocument?.data.size,
        selectedDocument?.data.purchasePrice,
        selectedDocument?.data.profit,
        selectedDocument?.data.inStock
      );
    }
  }, [selectedDocument]);

  return (
    <Stack spacing={2}>
      <TextField
        value={name}
        type="text"
        label="product name"
        onChange={(e) => {
          setName(e.target?.value?.toString().toLowerCase());
        }}
      />
      <FlatSelect
        getSelectedOption={setCategory}
        label="category"
        options={optionalData?.categories?.map((doc) => doc.data?.name) || []}
        value={category}
      />
      <TextField
        value={color}
        label="color"
        onChange={(e) => {
          setColor(e.target?.value?.toString().toLowerCase());
        }}
      />
      <TextField
        value={size}
        label="size"
        onChange={(e) => {
          setSize(e.target?.value?.toString().toLowerCase());
        }}
      />
      <TextField
        value={inStock}
        label="inStock"
        onChange={(e) => {
          setInStock(e.target?.value?.toString().toLowerCase());
        }}
      />
      <TextField
        value={purchasePrice}
        label="purchase price"
        onChange={(e) => {
          setPurchasePrice(e.target?.value?.toString().toLowerCase());
        }}
      />
      <TextField
        value={profit}
        label="profit"
        onChange={(e) => {
          setProfit(e.target?.value?.toString().toLowerCase());
        }}
      />
      <TextField value={+purchasePrice + +profit} label="sale price" disabled />
      <Button
        onClick={() => {
          handleSubmit(action);
        }}
      >
        {action}
      </Button>
    </Stack>
  );
}

export default Form;
