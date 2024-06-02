"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { QueryInfo } from "@/types";
import PageWrapper from "@/components/PageWrapper";
import { useStore } from "@/store";
import Form from "./Form";
import ViewTemplate from "@/components/ViewTemplate";

interface Props {}

const Purchases: React.FC<Props> = () => {
  const { getDocs } = useQuery();
  const purchases = useStore((state) => state.purchases);

  async function get(queryInfo: QueryInfo) {
    await getDocs(queryInfo, "purchases", "getting purchases");
  }
  useEffect(() => {
    get({});
  }, []);

  return (
    <PageWrapper
      View={ViewTemplate}
      Form={Form}
      getDocs={get}
      searchedDocuments={purchases}
      searchPlaceHolder="Enter Product Name"
      entity="Purchase"
      searchField="productName"
    ></PageWrapper>
  );
};

export default Purchases;
