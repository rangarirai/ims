"use client";
import { Category } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();
  return (
    <Stack sx={{ xs: { direction: "column" }, md: { direction: "row" } }}>
      <Button
        onClick={() => {
          router.push(`/settings/categories`);
        }}
        startIcon={<Category color="secondary" />}
      >
        categories
      </Button>
      <Button
        onClick={() => {
          router.push(`/settings/lowStockThreshold`);
        }}
        startIcon={<Category color="warning" />}
      >
        low stock threshold
      </Button>
      
    
    </Stack>
  );
}

export default Page;
