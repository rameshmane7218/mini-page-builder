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
