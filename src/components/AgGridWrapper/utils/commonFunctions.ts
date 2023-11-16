import dateComparator from "./dateComparator";

export const renderNA = (data: any) => {
  return data ? data : "N/A";
};

export const toUpperCaseWithUnderscore = (inputString: string) => {
  const words = inputString.split(" ").map(word => word.toUpperCase());
  return words.join("_");
};

export const toLowerCaseWithUnderscore = (inputString: string) => {
  const words = inputString.split(" ").map(word => word.toLowerCase());
  return words.join("_");
};

export const setDateFilterDefs = () => {
  return {
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      inRangeInclusive: true,
      suppressAndOrCondition: true,
      comparator: dateComparator,
      browserDatePicker: true,
    },
  };
};
