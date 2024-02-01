import { useState } from "react";
import * as helpers from "./helpers";

const NewEntryForm = ({updateState, keysArray, originalItems}) => {
  const [state, setState] = useState({
    label: "",
    link: "",
    desc: ""
  });
  
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateState(
      helpers.generateNewItemsObj(originalItems, [...keysArray], callbackForAdd)
    );
    setState({
      label: "",
      link: "",
      desc: ""
    });
  };
  
  const callbackForAdd = (modifierPointer, oldItemsObj) => {
    const targetObj = { [`item-${Date.now()}`]: state };
    if (oldItemsObj === undefined) {
      modifierPointer["$merge"] = { items: targetObj };
    } else {
      modifierPointer["$merge"] = targetObj;
    }
  };
  
  return (
    <form className="form-group row" onSubmit={handleSubmit}>
      <div className="col-xs-2">
        <input type="text" name="label" placeholder="Label" value={state.label} onChange={handleChange} className="form-control"></input>
      </div>
      <div className="col-xs-2">
        <input type="text" name="link" placeholder="Link" value={state.link} onChange={handleChange} className="form-control"></input>
      </div>
      <div className="col-xs-5">
        <input type="text" name="desc" placeholder="Description" value={state.desc} onChange={handleChange} className="form-control"></input>
      </div>
      <div className="col-xs-2">
        <button className="submitBtn"><i className="glyphicon glyphicon-ok"></i></button> 
        {/*here i have to use button, because I need the submit function to work, but I still wanna only show icon, not the actuall button. How? use css */}
      </div>                              
    </form>
  )
}

export default NewEntryForm;