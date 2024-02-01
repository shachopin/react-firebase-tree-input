import update from "react-addons-update"; //https://facebook.github.io/react/docs/update.html

const generateNewItemsObjectModifier = (oldItemsObjPointer, keysArray, callback) => {
  let modifierPointer = {};
  let modifier = modifierPointer;
  while (keysArray.length !== 0) {
    
    const removedKey = keysArray.shift();
    if (oldItemsObjPointer[removedKey].items === undefined) {
      modifierPointer[removedKey] = {};
      modifierPointer = modifierPointer[removedKey];
    } else {
      modifierPointer[removedKey] = { items: {} };
      modifierPointer = modifierPointer[removedKey].items;
    }
    oldItemsObjPointer = oldItemsObjPointer[removedKey].items;
  }

  callback(modifierPointer, oldItemsObjPointer);
  return modifier;
};



export const generateNewItemsObj = (oldItemsObj, indexArray, callback) => {
  return update(
    oldItemsObj,
    generateNewItemsObjectModifier(oldItemsObj, indexArray, callback)
  );
};
