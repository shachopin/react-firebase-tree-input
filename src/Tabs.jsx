import React, { Component } from "react";
import { Link } from "react-router-dom";
import base from "./base";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";

class Tabs extends Component {
  state = {
    items: {},
  };

  componentDidMount() {
    this.ref = base.syncState("subjectList/items", {
      context: this,
      state: "items",
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  //this following code snipet will query entire database and return the whole object using native firebase API:
  //{life: {…}, programming: {…}, project: {…}, subjectList: {…}, test2: {…}}
  // var starCountRef = firebase.database().ref();
  // starCountRef.on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });

  //not a good practice due to performance issue to just show the tab list

  handleRemoveTab = (e) => {
    if (
      confirm(`Do you really want to delete entire [${e.target.name}] bucket?`)
    ) {
      e.preventDefault(); //this is needed for history.push dowb below to work
      firebase.database().ref(e.target.name).remove(); //works when even sometimes this node is not created yet, for example when there is no child
      firebase.database().ref(`subjectList/items/${e.target.name}`).remove();
      //this.props.history.goBack();
      this.props.history.push("programming");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    firebase.database().ref(`subjectList/items/${this.input.value}`).set(true);
    this.props.history.push(this.input.value);
    e.currentTarget.reset();
  };

  render() {
    return (
      <ul className="nav nav-tabs">
        {Object.keys(this.state.items).map((key) => (
          <li key={key}>
            <Link to={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <button
                name={key}
                onClick={this.handleRemoveTab}
                className="removeTab glyphicon glyphicon-remove"
                style={{ marginLeft: "1px", top: "2px" }}
              />
              {/*have to use button here because we need to pass e.target.name. For i tag, onClick works, but e.target.name is undefined*/}
              {/* then how to make the button bend in with the tab background? use css background for removeTab*/}
            </Link>
          </li>
        ))}
        <li>
          <form onSubmit={this.handleSubmit}>
            <input
              ref={(input) => (this.input = input)}
              style={{ height: "41px", borderBottom: "none" }}
              className="form-control form-control-lg"
              placeholder="Enter a new bucket"
            />
          </form>
        </li>
      </ul>
    );
  }
}

export default withRouter(Tabs);

//inside Tabs, I want to have access to props.match, location, and history, but outside a Route, so by default not giving.. use withRouter
//https://stackoverflow.com/questions/42594804/how-to-access-history-object-outside-route-in-react-router-v4
