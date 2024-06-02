import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCurrentPage() {
  const [currentPage, setCurrentPage] = useState("");
  const pathName = usePathname();

  let pages: { [type: string]: string } = {
    ["products"]: "Products",
    ["sales"]: "Sales",
    ["purchases"]: "Purchases",
    ["categories"]: "Categories",
  };

  useEffect(() => {
    if (pathName) {
      let split1 = pathName.split("/");
      let lastValue = split1.at(-1);
      let split2 = lastValue?.split("?");
      if (split2) setCurrentPage(pages[split2[0]]);
    }
  }, [pathName]);

  return currentPage;
}
