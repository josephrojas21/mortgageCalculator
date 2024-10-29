import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMortgageCalculator } from "../hooks/useMortgageCalculator";
import { formatNumber } from "../utils/formatNumber";

interface Inputs {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: "accelerated bi-weekly" | "bi-weekly" | "monthly";
}

interface MortgageFormProps {
  onResult: (result: number) => void;
}

const schema = yup.object({
  propertyPrice: yup
    .number()
    .typeError("Please enter the property price")
    .positive("The price must be a positive value")
    .required("The property price is required"),
  downPayment: yup
    .number()
    .typeError("Please enter the down payment")
    .min(0, "Must be positive")
    .required("The down payment is required"),
  annualInterestRate: yup
    .number()
    .typeError("Please enter the interest rate")
    .min(0, "Must be positive")
    .max(100, "Must be 100 or less")
    .required("The annual interest rate is required"),
  amortizationPeriod: yup
    .number()
    .typeError("Please select an amortization period")
    .oneOf([5, 10, 15, 20, 25, 30], "The period must be between 5 and 30 years in 5-year increments")
    .required("The amortization period is required"),
  paymentSchedule: yup
    .string()
    .oneOf(["accelerated bi-weekly", "bi-weekly", "monthly"], "Select a valid option")
    .required("The payment frequency is required"),
});

const MortgageForm: React.FC<MortgageFormProps> = ({ onResult }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMortgageCalculator();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Inputs) => {
    const formattedValue = formatNumber(event.target.value);
    setValue(field, Number(event.target.value.replace(/\./g, "")));
    event.target.value = formattedValue;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data, {
      onSuccess: (result) => {
        onResult(result.paymentPerSchedule);
      },
      onError: (error) => {
        alert("Calculation error");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input
        type="text"
        placeholder="Property Price"
        onChange={(e) => handleNumberChange(e, "propertyPrice")}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <p className="text-red-500 text-sm mt-1">{errors.propertyPrice?.message}</p>
      <input
        type="text"
        placeholder="Down Payment"
        onChange={(e) => handleNumberChange(e, "downPayment")}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <p className="text-red-500 text-sm mt-1">{errors.downPayment?.message}</p>
      <input
        type="number"
        placeholder="Annual Interest Rate"
        {...register("annualInterestRate")}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <p className="text-red-500 text-sm mt-1">{errors.annualInterestRate?.message}</p>
      <select {...register("amortizationPeriod")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        <option value="">Select Amortization Period</option>
        {[5, 10, 15, 20, 25, 30].map((years) => (
          <option key={years} value={years}>{years} years</option>
        ))}
      </select>
      <p className="text-red-500 text-sm mt-1">{errors.amortizationPeriod?.message}</p>
      <select {...register("paymentSchedule")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        <option value="">Select Payment Frequency</option>
        <option value="accelerated bi-weekly">Accelerated Bi-Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <p className="text-red-500 text-sm mt-1">{errors.paymentSchedule?.message}</p>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Calculate
      </button>
    </form>
  );
};

export default MortgageForm;
