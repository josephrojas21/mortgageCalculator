import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface MortgageData {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: string;
}

interface MortgageResponse {
  paymentPerSchedule: number;
}

export const useMortgageCalculator = () => {
  return useMutation<MortgageResponse, Error, MortgageData>({
    mutationFn: async (data: MortgageData) => {
      const response = await axios.post("http://localhost:4000/api/calculate-mortgage", data);
      return response.data;
    },
  });
};
