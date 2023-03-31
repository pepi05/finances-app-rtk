import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleTransactionAction,
  updateTransactionAction,
} from "../../redux/slice/transactions/transactionSlice";

const EditTransaction = () => {
  //get transaction id
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get data from store
  const {
    transaction: transactionFetched,
    isUpdated,
    loading,
    error,
  } = useSelector((state) => state?.transactions);

  const accountId = useSelector((state) => state?.accounts?.account?.data?._id);

  const [transaction, setTransaction] = useState({
    name: transactionFetched?.data?.name,
    amount: transactionFetched?.data?.amount,
    transactionType: transactionFetched?.data?.transactionType,
    category: transactionFetched?.data?.category,
    notes: transactionFetched?.data?.notes,
  });

  const { name, amount, transactionType, category, notes } = transaction;

  const onChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTransactionAction({ ...transaction, id }));
  };

  //get single transaction
  useEffect(() => {
    dispatch(getSingleTransactionAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      if (isUpdated) {
        navigate("/dashboard");
        window.location.reload();
      }
    }, 2000);
  }, [isUpdated, navigate]);

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-4xl md:text-5xl text-center font-bold font-heading tracking-px-n leading-tight">
            Edit Transaction
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            You are editing transaction to {transactionFetched?.data?.name}
          </p>
          {error && (
            <p className="mb-3 font-medium text-lg text-red-600 leading-normal">
              {error}
            </p>
          )}
          <form onSubmit={onSubmit}>
            <label className="block mb-5">
              <input
                value={name}
                onChange={onChange}
                name="name"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Name"
              />
            </label>
            <label className="block mb-5">
              <input
                value={amount}
                onChange={onChange}
                name="amount"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-2"
                type="text"
                placeholder="Enter Amount"
              />
            </label>
            <label className="block mb-5">
              <select
                value={category}
                onChange={onChange}
                name="category"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Transaction Type --</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </label>
            <label className="block mb-5">
              <select
                value={transactionType}
                onChange={onChange}
                name="transactionType"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Category --</option>
                <option value="Personal">Personal</option>
                <option>Groceries</option>
                <option>Transportation</option>
              </select>
            </label>

            <div>
              <div className="mt-3 mb-3">
                <textarea
                  onChange={onChange}
                  value={notes}
                  placeholder="Add Notes"
                  rows={4}
                  name="notes"
                  id="comment"
                  className="block p-2  w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {loading ? (
              <button
                disabled
                className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-gray-300 bg-gray-600"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              >
                Update Transaction
              </button>
            )}

            <p className="font-medium">
              <a
                href={`/account/${accountId}`}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Back To Account
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditTransaction;
