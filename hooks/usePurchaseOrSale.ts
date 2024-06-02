import { useStore } from "@/store";
import { Doc } from "@/types";
import { useEffect, useState } from "react";
import { useQuery } from "./useQuery";

export function usePurchaseOrSale() {
  const { filterProducts } = useQuery();
  const products = useStore((state) => state.products);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const [productsFiltered, setProductsFiltered] = useState<Doc[]>([]);
  const { getDocs } = useQuery();
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
      setProductsFiltered(products.filter((product) => product.data.category));
    }
  }, [products, category]);
  useEffect(() => {
    if (name)
      setProductsFiltered((prev) =>
        prev.filter((product) => product.data.name)
      );
    if (color)
      setProductsFiltered((prev) =>
        prev.filter((product) => product.data.color)
      );
    if (size)
      setProductsFiltered((prev) =>
        prev.filter((product) => product.data.size)
      );
  }, [name, color, size]);

  return {
    productsFiltered,
    name,
    category,
    color,
    size,
    setProductsFiltered,
    setName,
    setCategory,
    setColor,
    setSize,
  };
}
