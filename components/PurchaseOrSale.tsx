import { Purchase, averageCost } from "@/app/purchases/Form";
import { Sale } from "@/app/sales/Form";
import { useBatch } from "@/hooks/useBatch";
import { usePurchaseOrSale } from "@/hooks/usePurchaseOrSale";
import { handleAlert, useStore } from "@/store";
import { Button, Stack, TextField } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import FlatSelect from "./FlatSelect";
import { FormProps } from "./PageWrapper";

function PurchaseOrSale({
  action,
  selectedDocument,
  entity,
}: FormProps & {
  entity: "sale" | "purchase";
}) {
  const { createSale, createPurchase } = useBatch();
  const [quantity, setQuantity] = useState("");
  const categories = useStore((state) => state.categories);
  //* purchase only
  const [todayPurchasePrice, setTodayPurchasePrice] = useState("");
  const [calculatedPurchasePrice, setCalculatedPurchasePrice] = useState("");
  //#

  const {
    productsFiltered,
    name,
    category,
    color,
    size,
    categoryDisplay,
    setProductsFiltered,
    setName,
    setCategory,
    setColor,
    setSize,
    getProduct,
  } = usePurchaseOrSale();

  function reset() {
    setProductsFiltered([]);
    setName("");
    setCategory("");
    setColor("");
    setSize("");
    setQuantity("");
    setTodayPurchasePrice("");
  }

  async function handleSale() {
    if (+quantity > +productsFiltered[0]?.data?.inStock) {
      handleAlert({ info: "quantity is more than stock" });
      return;
    }
    let sale: Sale = {
      created: serverTimestamp(),
      quantity: quantity.trim(),
      profit: productsFiltered[0]?.data?.profit,
      productId: productsFiltered[0]?.id || "",
      productName: productsFiltered[0]?.data?.name,
      productDescription: `${productsFiltered[0]?.data.category}, ${productsFiltered[0]?.data.color}, ${productsFiltered[0]?.data.size}`,
    };
    switch (action) {
      case "create":
        let res = await createSale(sale);
        if (res === "success") {
          reset();
        }
        break;
      case "update":
        await createSale(
          undefined,
          {
            quantity: quantity.trim(),
            productId: selectedDocument?.data.productId,
            lastEdited: serverTimestamp(),
          },
          selectedDocument?.data.quantity,
          selectedDocument?.id || ""
        );

        break;
      default:
        break;
    }
  }
  async function handlePurchase() {
    let purchase: Purchase = {
      created: serverTimestamp(),
      quantity: quantity.trim(),
      purchasePrice: calculatedPurchasePrice,
      todayPurchasePrice: todayPurchasePrice,
      previousPurchasePrice: productsFiltered[0].data.purchasePrice,
      productId: productsFiltered[0]?.id || "",
      productName: productsFiltered[0]?.data?.name,
      productDescription: `${productsFiltered[0]?.data.category}, ${productsFiltered[0]?.data.color}, ${productsFiltered[0]?.data.size}`,
    };

    switch (action) {
      case "create":
        let res = await createPurchase(purchase);
        if (res === "success") {
          reset();
        }
        break;
      case "update":
        await createPurchase(
          undefined,
          {
            quantity: quantity.trim(),
            productId: selectedDocument?.data.productId,
            lastEdited: serverTimestamp(),
            purchasePrice: calculatedPurchasePrice,
          },
          selectedDocument?.data.quantity,
          selectedDocument?.id || ""
        );
        break;

      default:
        break;
    }
  }
  async function handleSubmit(entity: "sale" | "purchase") {
    if (+quantity < 0) {
      handleAlert({ info: "quantity must not be negative" });
      return;
    }
    if (+quantity == 0 && action !== "update") {
      handleAlert({ info: "quantity must be greater than 0" });
      return;
    }
    if (entity === "sale") {
      handleSale();
    } else {
      handlePurchase();
    }
  }
  useEffect(() => {
    if (selectedDocument) {
      setQuantity(selectedDocument?.data.quantity);
      getProduct(selectedDocument?.data.productId);
      if (entity === "purchase") {
        setTodayPurchasePrice(selectedDocument?.data.todayPurchasePrice);
      }
    }
  }, [selectedDocument]);

  //* purchase only
  useEffect(() => {
    if (entity === "purchase") {
      let calculatedPurchasePriceTemp: number = 0;
      if (action === "update" && selectedDocument) {
        calculatedPurchasePriceTemp = averageCost(
          selectedDocument?.data.previousPurchasePrice,
          (
            +productsFiltered[0]?.data.inStock -
            +selectedDocument?.data.quantity
          ).toString(),
          todayPurchasePrice,
          quantity
        );
      } else {
        calculatedPurchasePriceTemp = averageCost(
          productsFiltered[0]?.data.purchasePrice,
          productsFiltered[0]?.data.inStock,
          todayPurchasePrice,
          quantity
        );
      }

      setCalculatedPurchasePrice(calculatedPurchasePriceTemp.toString());
    }
  }, [
    productsFiltered,
    todayPurchasePrice,
    quantity,
    selectedDocument,
    action,
  ]);
  //#
  return (
    <Stack spacing={2}>
      {action === "update" ? (
        <TextField value={categoryDisplay} label="category" disabled />
      ) : (
        <FlatSelect
          value={category}
          label="category"
          getSelectedOption={setCategory}
          options={categories?.map((doc) => doc.data?.name) || []}
        />
      )}

      <FlatSelect
        value={name}
        label="product name"
        getSelectedOption={setName}
        options={productsFiltered?.map((doc) => doc.data?.name) || []}
      />
      <FlatSelect
        value={color}
        label="color"
        getSelectedOption={setColor}
        options={productsFiltered?.map((doc) => doc.data?.color) || []}
      />
      <FlatSelect
        value={size}
        label="size"
        getSelectedOption={setSize}
        options={productsFiltered?.map((doc) => doc.data?.size) || []}
      />
      <TextField
        value={(
          +productsFiltered[0]?.data?.purchasePrice +
          +productsFiltered[0]?.data?.profit
        ).toString()}
        label="sale price"
        disabled
      />
      <TextField
        value={productsFiltered[0]?.data?.inStock + ""}
        label="in Stock"
        disabled
      />
      <TextField
        value={quantity}
        label="quantity"
        onChange={(e) => {
          setQuantity(e.target?.value?.toString().toLowerCase());
        }}
      />
      {entity === "sale" && (
        <TextField
          value={
            +quantity *
            (+productsFiltered[0]?.data?.purchasePrice +
              +productsFiltered[0]?.data?.profit)
          }
          label="total price"
          disabled
        />
      )}

      {entity === "purchase" && (
        <>
          <TextField
            value={todayPurchasePrice}
            label="today purchase price"
            onChange={(e) => {
              setTodayPurchasePrice(e.target?.value?.toString().toLowerCase());
            }}
          />
          <TextField
            value={+quantity * +todayPurchasePrice}
            label="total price"
            disabled
          />
          {/* //average cost method */}
          <TextField
            value={calculatedPurchasePrice}
            label="calculated purchase price"
            disabled
          />
        </>
      )}
      <Button
        color="warning"
        onClick={() => {
          handleSubmit(entity);
        }}
      >
        {action}
      </Button>
    </Stack>
  );
}

export default PurchaseOrSale;
