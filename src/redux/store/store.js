import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../slice/accounts/accountsSlice";
import usersReducer from "../slice/users/usersSlice";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
  },
});

export default store;
