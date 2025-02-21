import React from "react";
import base from "./base"; //firebase step 1/4
import { FamilyTree } from "./FamilyTree";
import NewEntryForm from "./NewEntryForm";

class App extends React.Component {
  state = {
    items: {},
    formShown: false,
    expandAll: false,
    searchText: '',
  };

  componentDidMount() { 
    this.syncStateWithFirebase(this.props.match.params.subjectId);  //will trigger 1st time componentDidUpdate
  }

  //will trigger 2nd and 3rd time componentDidUpdate (2nd time is the normal flow, 3rd is after the synstate (setState) or lengthy api retrieval is completed)
  //but componentWillReceiveProps will only run once, that's why you can put setState inside
  //if you put setState logic in componentWillUpdate or componentDidUpdate, will be causing infinite cycle
  componentWillReceiveProps(nextProps) { //even click on the same link, URL no change, will still trigger componentWillReceiveProps lifecyle method, 
    //componentWillReceiveProps won't be called if only state changes
    base.removeBinding(this.ref); //very important, to avoid records messing with each other brackets. Need to removeBinding first then resync with new brackets
    this.setState({formShown: false, expandAll: false, items: {}}); //also, to refresh the component state, because we are reusing the same component instance across different firebase brackets
    this.syncStateWithFirebase(nextProps.match.params.subjectId); 
  }

  syncStateWithFirebase(subjectId) { //firebase step 2/4  - step3/4 is in base.js
    this.ref = base.syncState(`${subjectId || "programming"}/items`, {
      context: this,
      state: "items"
    }); 
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
        
        <input
          onChange={(e) => this.setState({searchText: e.target.value})}
          style={{border: 0, height: 30, width:200 }}
          placeholder="Search"
        />

        {Object.keys(this.state.items).map((itemKey) => (
          <FamilyTree
            key={itemKey}
            tree={this.state.items[itemKey]}
            keysArray={[itemKey]}
            updateState={this.updateState}
            originalItems={this.state.items}
            expandAll={this.state.expandAll}
            history={this.props.history}
            searchText={this.state.searchText}
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
