// function TransactionsLoading() {
//   return function TransactionLoadingComponent({
//     isLoading,
//     ...props
//   }: {
//     isLoading: boolean;
//   }) {
//     if (!isLoading) return <Component {...props} />;
//     return (
//       <p className="text-xl dark:text-gray-100">
//         We are waiting for the data to load!...
//       </p>
//     );
//   };
// }

// export default TransactionsLoading;

function TransactionsLoading() {
  return (
    <p className="text-xl dark:text-gray-100">
      We are waiting for the data to load!...
    </p>
  );
}

export default TransactionsLoading;
