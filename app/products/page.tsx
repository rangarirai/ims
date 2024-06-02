"use client";
import PageWrapper from "@/components/PageWrapper";
import ViewTemplate from "@/components/ViewTemplate";
import { useQuery } from "@/hooks/useQuery";
import { useStore } from "@/store";
import { QueryInfo } from "@/types";
import { useEffect } from "react";
import Form from "./Form";

interface Props {}

const Products: React.FC<Props> = () => {
  const { getDocs } = useQuery();
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  async function get(queryInfo: QueryInfo) {
    await getDocs(queryInfo, "products", "getting products");
    await getDocs(queryInfo, "categories", "getting categories");
  }
  useEffect(() => {
    get({});
  }, []);

  return (
    <PageWrapper
      View={ViewTemplate}
      Form={Form}
      getDocs={get}
      searchedDocuments={products}
      searchPlaceHolder="Enter Product Name"
      entity="Product"
      searchField="name"
      optionalData={{ categories: categories }}
    ></PageWrapper>
  );
};

export default Products;
