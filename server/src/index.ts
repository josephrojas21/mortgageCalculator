import express, { Request, Response } from "express";
import cors from "cors";
import { calculateMortgage } from "./utils/calculateMortgage";

interface MortgageRequest {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: string;
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/calculate-mortgage', (req:any, res: any) => {
  const {
    propertyPrice,
    downPayment,
    annualInterestRate,
    amortizationPeriod,
    paymentSchedule,
  } = req.body;

  if (downPayment < 0.05 * propertyPrice) {
    return res.status(400).json({ error: "El pago inicial no es suficiente" });
  }

  const result = calculateMortgage(
    propertyPrice,
    downPayment,
    annualInterestRate,
    amortizationPeriod,
    paymentSchedule
  );

  return res.json({ paymentPerSchedule: result });
});


const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
