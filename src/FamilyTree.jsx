import { useState, useEffect } from "react";
import * as helpers from "./helpers";
import NewEntryForm from "./NewEntryForm";
import _ from "lodash";
import { Fields } from "./Fields";
import { Tooltip } from "./Tooltip";
import firebase from 'firebase/app';

export const FamilyTree = ({ tree, keysArray, updateState, originalItems, expandAll, history }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const [state, setState] = useState({
    label: tree.label,
    link: tree.link,
    desc: tree.desc,
  });
  
  const [showTooltip, setShowTooltip] = useState(false);
  const [showFixedTooltip, setShowFixedTooltip] = useState(false);

  // useEffect(() => {
  //   setState({
  //     label: tree.label,
  //     link: tree.link,
  //     desc: tree.desc,
  //   })
  // }, [tree.label, tree.link, tree.desc])  you know why you needed this to begin with then why remove it?
  
  const handleRemove = () => {
    //modifier pointer has to be landed at parent's items, therefore using slice
    if (!confirm("Are you sure to delete this?")) {
      return;
    }
    updateState(
      helpers.generateNewItemsObj(
        originalItems,
        keysArray.slice(0, keysArray.length - 1),
        (modifierPointer) => {
          modifierPointer[keysArray[keysArray.length - 1]] = { $set: null };
        }
      )
    );
  };

  const debouncedUpdateState = _.debounce((newState) => {
    updateState(newState);
  }, 300);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    debouncedUpdateState(
      helpers.generateNewItemsObj(
        originalItems,
        keysArray.slice(0, keysArray.length - 1),
        (modifierPointer) => {
          modifierPointer[keysArray[keysArray.length - 1]] = {
            [e.target.name]: { $set: e.target.value },
          };
        }
      )
    );
  };

  const handleCheckboxChange = () => {
    updateState(
      helpers.generateNewItemsObj(
        originalItems,
        keysArray.slice(0, keysArray.length - 1),
        (modifierPointer) => {
          modifierPointer[keysArray[keysArray.length - 1]] = {
            status: { $set: !tree.status },
          };
        }
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
  
  const handleMouseMovementForShowTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleDoubleClick = () => {
    setShowFixedTooltip(!showFixedTooltip);
  };
  
  const handleCreateSuchInNewBucket = () => {
    const currentNode = helpers.pointToCurrentlySelectedNode(originalItems, keysArray.slice(0, keysArray.length - 1));
    firebase.database().ref(tree.label).child('items/root').set(currentNode[keysArray[keysArray.length - 1]]);
    firebase.database().ref('subjectList/items').child(tree.label).set(true);
    history.push(tree.label);
  };

  return (
    <>
      <div className={`form-group row ${tree.status ? "lineThrough" : ""}`}>
        <Fields handleChange={handleChange} state={state} onMouseOver={handleMouseMovementForShowTooltip} onMouseOut={handleMouseMovementForShowTooltip} onDoubleClick={handleDoubleClick}  />
        <div className="col-xs-2 actionPanelLayout">
          <input
            className="space-right"
            type="checkbox"
            id="checkboxNoLabel"
            onChange={handleCheckboxChange}
            checked={tree.status}
          />
          {!expandAll && <i onClick={showMore} className="glyphicon glyphicon-collapse-down" />}
          <i onClick={showForm} className="glyphicon glyphicon-plus" />
          {!expandAll && <i onClick={collapse} className="glyphicon glyphicon-collapse-up" />}
          <i onClick={handleRemove} className="glyphicon glyphicon-remove" />
          <i onClick={handleCreateSuchInNewBucket} className="glyphicon glyphicon-new-window"/>
        </div>
      </div>
      
      <Tooltip state={state} showFixedTooltip={showFixedTooltip} showTooltip={showTooltip}/>
      
      {(expandAll || isVisible) && tree.items ? (
        Object.keys(tree.items).map((itemKey) => (
          <div key={itemKey} className="leftIndent">
            <FamilyTree
              tree={tree.items[itemKey]}
              keysArray={[...keysArray, itemKey]}
              updateState={updateState}
              originalItems={originalItems}
              expandAll={expandAll}
              history={history}
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
