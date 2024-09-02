export default () => {
  const fetchTransaction = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useApiFetch("/api/transactions");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return {
    fetchTransaction,
  };
};
