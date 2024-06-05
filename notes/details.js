//assumptions
// 1.  all prices are in USD

/* notes */
//  1. we might need to use transactions instead of batches, if multiple people are using the app

//{store, pagewrapper, helper functions}

/*
> timesheet
> 07:50

*/
const may = {
  28: "3hrs",
  29: "6hrs", //9
  30: "3hrs", //12
  31: "4hrs", //16
};

const june = {
  1: "4hrs", //20
  2: "6hrs", //26
  3: "4hrs", //30
  4: "3hrs", //33
  5: "",
};

// record email of any user who updates the database
// reduce going to the database a lot, eg when category changes, we culd include caching
// search bar must be fixed
