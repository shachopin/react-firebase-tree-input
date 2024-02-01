import { useState } from "react";
import * as helpers from "./helpers";

export const FamilyTree = ({ tree, keysArray, updateState, originalItems }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    updateState(
      helpers.generateNewItemsObj(originalItems, [...keysArray], callbackForAdd)
    );
    setValue("");
  };

  const handleRemove = () => { //modifier pointer has to be landed at parent's items, therefore using slice
    updateState(
      helpers.generateNewItemsObj(
        originalItems,
        keysArray.slice(0, keysArray.length - 1),
        callbackForRemove
      )
    );
  };

  const callbackForAdd = (modifierPointer, oldItemsObj) => {
    const targetObj = { [`item-${Date.now()}`]: { label: value, desc: value } };
    if (oldItemsObj === undefined) {
      modifierPointer["$merge"] = { items: targetObj };
    } else {
      modifierPointer["$merge"] = targetObj;
    }
  };

  const callbackForRemove = (modifierPointer) => {
    modifierPointer[keysArray[keysArray.length - 1]] = { $set: null };
  };

  const showMore = () => {
    setIsVisible(true);
  };

  const showForm = () => {
    showMore();
    setFormShown(true);
  };

  const collapse = () => {
    setFormShown(false);
    setIsVisible(false);
  };

  return (
    <>
      <p>
        {tree.label} <button onClick={showMore}>show more</button>
        <button onClick={showForm}>add</button>
        <button onClick={collapse}>collapse</button>
        <button onClick={handleRemove}>remove</button>
      </p>
      {isVisible && tree.items ? (
        Object.keys(tree.items).map((itemKey) => (
          <div key={itemKey} className="leftIndent">
            <FamilyTree
              tree={tree.items[itemKey]}
              keysArray={[...keysArray, itemKey]}
              updateState={updateState}
              originalItems={originalItems}
            />
          </div>
        ))
      ) : (
        <></>
      )}
      {formShown && (
        <div className="leftIndent">
          <form onSubmit={handleSubmit}>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
          </form>
        </div>
      )}
    </>
  );
};
