import React, { useEffect, useState } from "react";
import Cards from "../components/Card/Cards";
import AddExpense from "../components/Models/AddExpense";
import AddIncome from "../components/Models/AddIncome";
import moment from "moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Loader from "../components/Loader/Loader";
import TransactionTable from "../components/TransactionTable/TransactionTable";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const addTransaction = async (transaction) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction)
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  };

  const onFinish = (values, type) => {
    const newTransction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransction);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        expenseTotal += transaction.amount;
      } else {
        incomeTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };
  useEffect(() => {
    fetchTransactions();
  }, [user]);
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionTable
          transactions={transactions}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
