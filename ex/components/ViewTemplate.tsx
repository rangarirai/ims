import { formatData, getColor } from "@/helperFunctions";
import { InputLabel, Stack, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { ViewPageProps } from "./PageWrapper";

function ViewTemplate({ selectedDocument }: ViewPageProps) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (selectedDocument) setData(formatData(selectedDocument?.data));
  }, [selectedDocument]);

  return (
    <Stack spacing={1}>
      {Object.keys(data || {}).map((key, index) => (
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          key={key}
          sx={(theme: Theme) => ({
            backgroundColor: getColor(theme, index),
          })}
        >
          <InputLabel>{key}</InputLabel>
          {data && (
            <InputLabel sx={{ whiteSpace: "pre-wrap" }}>
              {key.slice(-5) === "Price"
                ? Number(`${data[`${key}`]}`).toFixed(2)
                : `${data[`${key}`]}`}
            </InputLabel>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

export default ViewTemplate;
