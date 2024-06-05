"use client";
import { useEffect, useState } from "react";

import Form from "./Form";
import { useQuery } from "@/hooks/useQuery";
import { QueryInfo } from "@/types";
import PageWrapper from "@/components/PageWrapper";
import { useStore } from "@/store";
import ViewTemplate from "@/components/ViewTemplate";

interface Props {}

const Page: React.FC<Props> = () => {
  const { getDocs } = useQuery();
  const categories = useStore((state) => state.categories);

  async function get(queryInfo: QueryInfo) {
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
      searchedDocuments={categories}
      searchPlaceHolder="Enter Category Name"
      entity="Category"
      searchField="name"
    ></PageWrapper>
  );
};

export default Page;
