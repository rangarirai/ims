"use client"

import { useCrud } from "@/hooks/useCrud";
import { setLowStockThreshold, useStore } from "@/store";
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

function Page() {
  const lowStockThreshold = useStore((state) => state.lowStockThreshold);
  const { handleSetDoc } = useCrud();
  return (
    <Stack spacing={1}>
      <TextField
        value={lowStockThreshold}
        type="text"
        label="name"
        onChange={(e) => {
          setLowStockThreshold(+e.target?.value);
        }}
      />
      <Button
        onClick={async () => {
          let res = await handleSetDoc(
            "settings",
            "lowStockThreshold",
            {
              value: lowStockThreshold,
            },
            "lowStockThreshold value saved",
            "saving lowStockThreshold value"
          );
        }}
      >
        save
      </Button>
    </Stack>
  );
}

export default Page;
