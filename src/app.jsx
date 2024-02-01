import React from "react";
import base from "./base"; //firebase step 1/4
import { FamilyTree } from "./FamilyTree";

class App extends React.Component {
  state = {
    items: {},
  };

  componentDidMount() {
    this.syncStateWithFirebase(); //will trigger 1st time componentDidUpdate
  }

  syncStateWithFirebase() {
    //firebase step 2/4  - step3/4 is in base.js
    this.ref = base.syncState("programming/items", {
      context: this,
      state: "items",
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref); //firebase step 4/4 to avoid memory leak caused by unused idle linking with firebase
  }
  
  updateState = (updatedItems) => {
     this.setState({items: updatedItems}); 
  };
  
  render() {
    return (
      <>
        {Object.keys(this.state.items).map((itemKey) => (
          <FamilyTree key={itemKey} tree={this.state.items[itemKey]} keysArray={[itemKey]} updateState={this.updateState} originalItems={this.state.items}/>
        ))}
      </>
    );
  }
}

export default App;
