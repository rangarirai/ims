import { setProducts, useStore } from "@/store";
import { Doc } from "@/types";
import { useEffect, useState } from "react";
import { useQuery } from "./useQuery";
import { useCrud } from "./useCrud";

export function usePurchaseOrSale() {
  const { filterProducts } = useQuery();
  const products = useStore((state) => state.products);
  const { handleGetDoc } = useCrud();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  //* this state was introduced to avoid rerender when settimg category for display during editing
  const [categoryDisplay, setCategoryDisplay] = useState("");
  //#
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const [productsFiltered, setProductsFiltered] = useState<Doc[]>([]);
  const { getDocs } = useQuery();

  async function getProduct(productId: string) {
    let res = await handleGetDoc(
      "products",
      productId,
      null,
      "getting product"
    );

    if (res) {
      setProductsFiltered([{ data: res, id: productId }]);
      let { color, size, category, name } = res;
      setColor(color);
      setSize(size);
      setCategoryDisplay(category);
      setName(name);
    }
  }
  useEffect(() => {
    if (category) {
      filterProducts(undefined, category);
    }
  }, [category]);
  useEffect(() => {
    async function getCategories() {
      await getDocs({}, "categories", "getting categories");
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (category) {
      setProductsFiltered(products);
    }
  }, [products, category]);
  useEffect(() => {
    if (name && color && size) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return (
            data.name === name && data.color === color && data.size === size
          );
        })
      );
    } else if (name && color) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return data.name === name && data.color === color;
        })
      );
    } else if (name && size) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return data.name === name && data.size === size;
        })
      );
    } else if (color && size) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return data.color === color && data.size === size;
        })
      );
    } else if (name) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return data.name === name;
        })
      );
    } else if (color) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return data.color === color;
        })
      );
    } else if (size) {
      setProductsFiltered(
        products.filter((product) => {
          let data = product.data;
          return data.size === size;
        })
      );
    }
  }, [name, color, size]);

  return {
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
  };
}
