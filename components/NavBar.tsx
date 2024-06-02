import { useCurrentPage } from "@/hooks/useCurrentPage";
import { Category } from "@mui/icons-material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import StoreIcon from "@mui/icons-material/Store";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
function NavBar() {
  const [value, setValue] = React.useState(1);
  const router = useRouter();
  const currentPage = useCurrentPage();

  useEffect(() => {
    switch (currentPage) {
      case "Categories":
        setValue(0);
        break;
      case "Products":
        setValue(1);
        break;
      case "Sales":
        setValue(2);
        break;
      case "Purchases":
        setValue(3);
        break;

      default:
        break;
    }
  }, [currentPage]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Categories"
          icon={<Category />}
          onClick={() => {
            router.push("/categories");
          }}
        />
        <BottomNavigationAction
          label="Products"
          icon={<InventoryIcon />}
          onClick={() => {
            router.push("/products");
          }}
        />
        <BottomNavigationAction
          label="Sales"
          icon={<PointOfSaleIcon />}
          onClick={() => {
            router.push("/");
          }}
        />
        <BottomNavigationAction
          label="Purchases"
          icon={<StoreIcon />}
          onClick={() => {
            router.push("/purchases");
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default NavBar;
