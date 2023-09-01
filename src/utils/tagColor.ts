export const tagColorSwitcher = (tagText: string) => {
  switch (tagText) {
    case "1": {
      return "red";
    }
    case "2": {
      return "blue";
    }
    case "3": {
      return "green";
    }
    case "4": {
      return "yellow";
    }
    default: {
      return "grey";
    }
  }
};
