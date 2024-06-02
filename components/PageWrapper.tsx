import { getColor } from "@/helperFunctions";
import { QueryInfo, FormActionType, Doc } from "@/types";
import { Edit, Visibility } from "@mui/icons-material";
import { Button, InputLabel, Stack, TextField, Theme } from "@mui/material";
import { useState } from "react";
import PagesDialog from "../components/pagesDialog/PagesDialog";
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
  getDocs: (queryInfo: QueryInfo) => void;
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
  }

  return (
    <>
      <Stack spacing={2}>
        <Button onClick={() => openCreate()}>Create {entity}</Button>
        <Stack direction={"row"} alignItems="center" spacing={2}>
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
                  setSelectedDocument(structuredClone(doc));
                  setComponent({ type: "view", action: "none" });
                  setOpen(true);
                }}
              >
                <Visibility />
              </Button>
              <Button
                color={"warning"}
                onClick={() => {
                  setSelectedDocument(structuredClone(doc));
                  setComponent({ type: "form", action: "update" });
                  setOpen(true);
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
