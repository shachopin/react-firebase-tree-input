import { useState } from "react";
import * as helpers from "./helpers";
import { Fields } from "./Fields";

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
      <Fields handleChange={handleChange} state={state}/>
      <div className="col-xs-2">
        <button className="submitBtn"><i className="glyphicon glyphicon-ok"></i></button> 
        {/*here i have to use button, because I need the submit function to work, but I still wanna only show icon, not the actuall button. How? use css */}
      </div>                              
    </form>
  )
}

export default NewEntryForm;