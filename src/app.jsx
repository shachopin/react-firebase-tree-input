import React from "react";
import base from "./base"; //firebase step 1/4
import { FamilyTree } from "./FamilyTree";
import NewEntryForm from "./NewEntryForm";

class App extends React.Component {
  state = {
    items: {},
    formShown: false,
    expandAll: false,
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
    this.setState({ items: updatedItems });
  };

  toggleForm = () =>
    this.setState((prevState) => ({ formShown: !prevState.formShown }));

  toggleExpandAll = () =>
    this.setState((prevState) => ({ expandAll: !prevState.expandAll }));

  render() {
    return (
      <>
        <button
          className="btn btn-primary top-buttons"
          onClick={this.toggleForm}
        >
          {this.state.formShown ? "Cancel" : "Add to this bucket"}
        </button>

        <button
          className="btn btn-success top-buttons"
          onClick={this.toggleExpandAll}
        >
          {this.state.expandAll ? "Cancel" : "Expand All"}
        </button>

        {Object.keys(this.state.items).map((itemKey) => (
          <FamilyTree
            key={itemKey}
            tree={this.state.items[itemKey]}
            keysArray={[itemKey]}
            updateState={this.updateState}
            originalItems={this.state.items}
            expandAll={this.state.expandAll}
          />
        ))}

        {this.state.formShown && (
          <NewEntryForm
            updateState={this.updateState}
            keysArray={[]}
            originalItems={this.state.items}
          />
        )}
      </>
    );
  }
}

export default App;
