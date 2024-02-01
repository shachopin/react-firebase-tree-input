import { useState } from "react";
import * as helpers from "./helpers";
import NewEntryForm from "./NewEntryForm";
import _ from "lodash";

export const FamilyTree = ({ tree, keysArray, updateState, originalItems }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const [state, setState] = useState({
    label: tree.label,
    link: tree.link,
    desc: tree.desc,
  });

  const handleRemove = () => {
    //modifier pointer has to be landed at parent's items, therefore using slice
    if (!confirm("Are you sure to delete this?")) {
        return;
    }  
    updateState(
      helpers.generateNewItemsObj(
        originalItems,
        keysArray.slice(0, keysArray.length - 1),
        callbackForRemove
      )
    );
  };

  const callbackForRemove = (modifierPointer) => {
    modifierPointer[keysArray[keysArray.length - 1]] = { $set: null };
  };

  const debouncedUpdateState = _.debounce((newState) => {
    updateState(newState);
  }, 300);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    const callbackForUpdate = (modifierPointer) => {
      modifierPointer[keysArray[keysArray.length - 1]] = {
        [e.target.name]: { $set: e.target.value },
      };
    };

    debouncedUpdateState(
      helpers.generateNewItemsObj(
        originalItems,
        keysArray.slice(0, keysArray.length - 1),
        callbackForUpdate
      )
    );
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
      <div className="form-group row">
        <div className="col-xs-2">
          <input
            className="form-control"
            name="label"
            value={state.label}
            onChange={handleChange}
            placeholder="Label"
          />
        </div>
        <div className="col-xs-2">
          <input
            className="form-control"
            name="link"
            value={state.link}
            onChange={handleChange}
            placeholder="Link"
          />
        </div>
        <div className="col-xs-5">
          <input
            className="form-control"
            name="desc"
            value={state.desc}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <div className="col-xs-2">
          <i onClick={showMore} className="glyphicon glyphicon-collapse-down" />
          <i onClick={showForm} className="glyphicon glyphicon-plus" />
          <i onClick={collapse} className="glyphicon glyphicon-collapse-up" />
          <i onClick={handleRemove} className="glyphicon glyphicon-remove" />
        </div>
      </div>
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
          <NewEntryForm
            updateState={updateState}
            keysArray={keysArray}
            originalItems={originalItems}
          />
        </div>
      )}
    </>
  );
};
