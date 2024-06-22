import { useCurrentPage } from "@/hooks/useCurrentPage";
import { Category, Settings } from "@mui/icons-material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import StoreIcon from "@mui/icons-material/Store";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { handleAlert, setLowStockThreshold, setUser, useStore } from "@/store";
import { Badge } from "@mui/material";
import { useCrud } from "@/hooks/useCrud";
import { onAuthStateChanged } from "firebase/auth";
function NavBar() {
  const [value, setValue] = React.useState(1);
  const [productsWithLowStock, setProductsWithLowStock] = useState(0);
  const lowStockThreshold = useStore((state) => state.lowStockThreshold);
  const router = useRouter();
  const { handleGetDoc } = useCrud();
  const currentPage = useCurrentPage();

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("inStock", "<=", lowStockThreshold)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const products: string[] = [];
        snapshot.forEach((doc) => {
          products.push(doc.data().name);
        });
        setProductsWithLowStock(products.length);
      },
      (error) => {
        handleAlert({ error });
      }
    );
    return () => {
      unsubscribe();
    };
  }, [lowStockThreshold]);

  useEffect(() => {
    async function setLowStockThresholdValue() {
      let res = await handleGetDoc(
        "settings",
        "lowStockThreshold",
        undefined,
        "get lowStockThreshold value"
      );
      setLowStockThreshold(res?.value || lowStockThreshold);
    }
    setLowStockThresholdValue();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(undefined);
      } else {
        if (user?.phoneNumber) setUser({ phoneNumber: user?.phoneNumber });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    switch (currentPage) {
      case "Settings":
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
          label="Settings"
          icon={<Settings />}
          onClick={() => {
            router.push("/settings");
          }}
        />
        <BottomNavigationAction
          label="Products"
          icon={
            <Badge badgeContent={productsWithLowStock} color="error">
              <InventoryIcon />
            </Badge>
          }
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
