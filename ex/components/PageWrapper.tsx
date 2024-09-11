import { getColor, getDate, getMonth, getYear } from "@/helperFunctions";
import { QueryInfo, FormActionType, Doc } from "@/types";
import { Edit, Visibility } from "@mui/icons-material";
import { Button, InputLabel, Stack, TextField, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import PagesDialog from "../components/pagesDialog/PagesDialog";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { createPurchaseOrSaleCollectionPath } from "@/hooks/useBatch";
import { useStore } from "@/store";
import FlatSelect from "./FlatSelect";
var cloneDeep = require("lodash.clonedeep");

export type FormProps = {
  action: FormActionType;
  selectedDocument?: Doc;
  optionalData?: OptionalData;
};
export type ViewPageProps = {
  selectedDocument: Doc;
};
type OptionalData = {
  categories?: Doc[];
};

interface PageWrapperProps {
  Form: (props: FormProps) => JSX.Element;
  View: (props: ViewPageProps) => JSX.Element;
  searchedDocuments: Doc[];
  getDocs: (queryInfo: QueryInfo, collectionPath?: string) => void;
  searchPlaceHolder: string;
  entity: "Product" | "Purchase" | "Sale" | "Category";
  searchField: string;
  optionalData?: OptionalData;
}
type ComponentType = {
  type: "form" | "view";
  action: FormActionType;
};
const PageWrapper: React.FC<PageWrapperProps> = ({
  Form,
  View,
  searchedDocuments,
  getDocs,
  searchPlaceHolder,
  entity,
  searchField,
  optionalData,
}) => {
  const [selectedDocument, setSelectedDocument] = useState<Doc>({
    data: "",
    id: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const lowStockThreshold = useStore((state) => state.lowStockThreshold);
  const [date, setDate] = useState<string>(
    `${getYear()}-${getMonth() + 1}-${getDate()}`
  );
  const [component, setComponent] = useState<ComponentType>({
    type: "form",
    action: "create",
  });
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);

  function handleClose() {
    setOpen(false);
    if (refresh) {
      getDocs({});
    }
  }

  function openCreate() {
    setComponent({ type: "form", action: "create" });
    setOpen(true);
    setRefresh(true);
  }
  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <>
      <Stack spacing={2}>
        <Button onClick={() => openCreate()}>Create {entity}</Button>
        <Stack direction={"row"} alignItems="top" spacing={2}>
          {entity === "Product" && (
            <Stack justifySelf={"center"} spacing={1}>
              <FlatSelect
                value={category}
                label="category"
                getSelectedOption={setCategory}
                options={
                  optionalData?.categories?.map((doc) => doc.data?.name) || []
                }
              />
              <Button
                onClick={() => {
                  getDocs({ field: "category", value: category });
                }}
              >
                Search
              </Button>
            </Stack>
          )}
          {entity === "Purchase" || entity === "Sale" ? (
            <>
              <DatePicker
                label="Search By Date"
                value={dayjs(date)}
                onChange={(value) => {
                  setDate(value?.format() || "");
                }}
                format="DD/MM/YYYY"
              />
              <Button
                onClick={() => {
                  let values = date.split("T")[0].split("-");
                  let collectionPath = "";
                  if (entity === "Purchase") {
                    collectionPath = createPurchaseOrSaleCollectionPath(
                      "purchases",
                      +values[0],
                      +values[1],
                      +values[2]
                    );
                  }
                  if (entity === "Sale") {
                    collectionPath = createPurchaseOrSaleCollectionPath(
                      "sales",
                      +values[0],
                      +values[1],
                      +values[2]
                    );
                  }
                  getDocs({}, collectionPath);
                }}
              >
                Search
              </Button>
            </>
          ) : (
            <Stack spacing={1}>
              <TextField
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target?.value);
                }}
                placeholder={`${searchPlaceHolder}`}
              ></TextField>

              <Button
                onClick={() => {
                  getDocs({ field: searchField, value: searchValue });
                }}
              >
                Search
              </Button>
            </Stack>
          )}
        </Stack>
        {searchedDocuments?.map((doc, index) => (
          <Stack
            direction={"row"}
            key={doc.id}
            alignItems="center"
            justifyContent={"space-between"}
            sx={(theme: Theme) => ({
              backgroundColor: getColor(theme, index),
            })}
          >
            <InputLabel>{doc.data?.productName || doc.data?.name}</InputLabel>
            <Stack direction={"row"}>
              <Button
                color={"success"}
                onClick={() => {
                  setSelectedDocument(cloneDeep(doc));
                  setComponent({ type: "view", action: "none" });
                  setOpen(true);
                  setRefresh(false);
                }}
              >
                <Visibility
                  color={
                    entity === "Product" &&
                    doc.data.inStock <= lowStockThreshold
                      ? "error"
                      : "info"
                  }
                />
              </Button>
              <Button
                color={"secondary"}
                onClick={() => {
                  setSelectedDocument(cloneDeep(doc));
                  setComponent({ type: "form", action: "update" });
                  setOpen(true);
                  setRefresh(true);
                }}
              >
                <Edit />
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <PagesDialog open={open} handleClose={handleClose}>
        {component.type === "form" ? (
          <Form
            {...(component.action === "update"
              ? { selectedDocument: selectedDocument }
              : {})}
            action={component.action}
            optionalData={optionalData}
          />
        ) : (
          <View selectedDocument={selectedDocument} />
        )}
      </PagesDialog>
    </>
  );
};

export default PageWrapper;
