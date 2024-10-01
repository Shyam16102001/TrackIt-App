import { useToast } from "@/components/ui/toast/use-toast";
export default () => {
  const { toast } = useToast();
  const fetchTransaction = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useApiFetch("/api/v1/transactions");
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const addTransaction = (formData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await useApiFetch("/api/v1/transactions", {
          body: formData,
          method: "post",
        });
        toast({
          title: "Transaction Added Successfully",
          description: "Your transaction has been added to your account.",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please try again later.",
        });
      }
    });
  };

  const fetchTransactionStats = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useApiFetch("/api/v1/transactions/stats");
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    fetchTransaction,
    addTransaction,
    fetchTransactionStats,
  };
};
