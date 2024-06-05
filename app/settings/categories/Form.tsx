import { FormProps } from "@/components/PageWrapper";
import { useCrud } from "@/hooks/useCrud";
import { FormActionType } from "@/types";
import { Button, Stack, TextField } from "@mui/material";
import { FieldValue, serverTimestamp } from "firebase/firestore";

import { useEffect, useState } from "react";

export type Category = {
  name: string;
  created: FieldValue;
};

function Form({ action, selectedDocument }: FormProps) {
  const [name, setName] = useState("");

  const { handleAddDoc, handleSetDoc } = useCrud();
  async function handleSubmit(action: FormActionType) {
    let category: Category = {
      name: name.trim(),
      created: serverTimestamp(),
    };

    switch (action) {
      case "create":
        let res = await handleAddDoc(
          "categories",
          category,
          "category added",
          "adding category"
        );
        if (res === "success") {
          //reset values
          setFormValues("");
        }
        break;
      case "update":
        await handleSetDoc(
          "categories",
          selectedDocument?.id || "",
          category,
          "category info updated",
          "updating category info"
        );
        break;

      default:
        break;
    }
  }
  function setFormValues(name: string) {
    setName(name);
  }
  useEffect(() => {
    if (selectedDocument) {
      setFormValues(selectedDocument?.data.name);
    }
  }, [selectedDocument]);

  return (
    <Stack spacing={2}>
      <TextField
        value={name}
        type="text"
        label="name"
        onChange={(e) => {
          setName(e.target?.value?.toString().toLowerCase());
        }}
      />
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
