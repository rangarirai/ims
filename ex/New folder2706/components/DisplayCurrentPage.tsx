import { useCurrentPage } from "@/hooks/useCurrentPage";
import { Typography } from "@mui/material";

function DisplayCurrentPage() {
  const currentPage = useCurrentPage();
  return (
    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
      {currentPage}
    </Typography>
  );
}

export default DisplayCurrentPage;
