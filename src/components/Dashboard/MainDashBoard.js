import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/usersSlice";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  //get data from store
  const { profile, loading, error } = useSelector((state) => state?.users);

  return (
    <>
      {loading ? (
        <h2 className="text-center text-green-500 mt-5 text-lg">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-red-600 mt-5 text-lg">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
