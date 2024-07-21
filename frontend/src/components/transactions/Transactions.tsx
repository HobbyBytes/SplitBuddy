import React, { useEffect, useState } from "react";
import TransactionsLoading from "./TransactionsLoading";
import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import Transaction from "@/types/Transaction";

function Transactions() {
  const [transactionState, setTransactionState] = useState<{
    loading: boolean;
    transactions: Transaction[];
  }>({
    loading: false,
    transactions: [],
  });

  useEffect(() => {
    setTransactionState({ loading: true, transactions: [] });
    const apiUrl = `http://127.0.0.1:8000/transactions/`;
    fetch(apiUrl)
      .then((data) => data.json())
      .then((txs) => {
        setTransactionState({
          loading: false,
          transactions: txs,
        });
        console.log(txs);
      });
  }, [setTransactionState]);

  return (
    <div>
      <h1 className="text-xl font-bold">Latest Transactions</h1>
      {transactionState.loading ? (
        <TransactionsLoading />
      ) : (
        <Card className="my-6 w-96">
          <List>
            {transactionState.transactions.map((transaction) => (
              <ListItem>
                {transaction?.title}
                <ListItemSuffix>
                  <Chip
                    value={transaction?.amount}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </div>
  );
}

export default Transactions;
