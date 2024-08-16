import React from "react";
 import { Provider } from "react-redux";
 import store from "./Home/Store";
import UserTable from "./Home/UserTable";

const App = () => {

  return (
    <Provider store={store}>
      <UserTable />
    </Provider>
  );
};

export default App;
