export const validateItemStructure = (
  item: Record<string, any>,
  expectedStructure: Record<string, any>,
) => {
  // Check if the item has the expected keys
  const hasExpectedKeys = Object.keys(item).every((key) =>
    expectedStructure.hasOwnProperty(key),
  );
  if (hasExpectedKeys) return true;

  //   // If it has the expected keys, check the nested structure
  //   if (hasExpectedKeys) {
  //     for (const key in expectedStructure) {
  //       if (typeof expectedStructure[key] === "object") {
  //         // Recursively check nested structure
  //         if (!validateItemStructure(item[key], expectedStructure[key])) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   }

  return false;
};

export const sampleBlockLayout = [
  {
    blockType: "Label",
    settings: {
      text: "This is a Label",
      x: 448,
      y: 128.5,
      fontSize: "",
      fontWeight: "",
    },
    id: "e7f7d007-68a8-4bac-ba04-a99a3a295c27",
  },
  {
    blockType: "Button",
    settings: {
      text: "Button",
      x: 446,
      y: 230,
      fontSize: "",
      fontWeight: "",
    },
    id: "5406c6ce-94fc-45d7-8ed3-6ee61b0fcdad",
  },
  {
    blockType: "Input",
    settings: {
      defaultValue: "This is a Input box",
      x: 446,
      y: 166.5,
      fontSize: "",
      fontWeight: "",
    },
    id: "668f1f77-8d05-4578-9e08-81bfad25eaec",
  },
];
