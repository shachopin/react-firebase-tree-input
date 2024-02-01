import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
//firebase step 3/4
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBVADPQJgaIoq_uJGoL3o4UROQP2jbQz3I",
  authDomain: "react-tree-simplified.firebaseapp.com",
  databaseURL: "https://react-tree-simplified-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
//export { firebaseApp };

// this is a default export
export default base;