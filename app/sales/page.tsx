"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { QueryInfo } from "@/types";
import PageWrapper from "@/components/PageWrapper";
import { useStore } from "@/store";

import Form from "./Form";
import ViewTemplate from "@/components/ViewTemplate";

interface Props {}

const Sales: React.FC<Props> = () => {
  const { getDocs } = useQuery();
  const sales = useStore((state) => state.sales);

  async function get(queryInfo: QueryInfo) {
    await getDocs(queryInfo, "sales", "getting sales");
  }
  useEffect(() => {
    get({});
  }, []);

  return (
    <PageWrapper
      View={ViewTemplate}
      Form={Form}
      getDocs={get}
      searchedDocuments={sales}
      searchPlaceHolder="Enter Product Name"
      entity="Sale"
      searchField="productName"
    ></PageWrapper>
  );
};

export default Sales;
