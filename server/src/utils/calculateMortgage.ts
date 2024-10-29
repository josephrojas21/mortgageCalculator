export function calculateMortgage(
  propertyPrice: number,
  downPayment: number,
  annualInterestRate: number,
  amortizationPeriod: number,
  paymentSchedule: string
): number {
  const principal = propertyPrice - downPayment;
  const interestRatePerPeriod =
    annualInterestRate / 100 / getPaymentFrequency(paymentSchedule);
  const totalPayments =
    amortizationPeriod * getPaymentFrequency(paymentSchedule);

  const mortgagePayment =
    (principal *
      interestRatePerPeriod *
      Math.pow(1 + interestRatePerPeriod, totalPayments)) /
    (Math.pow(1 + interestRatePerPeriod, totalPayments) - 1);
  return mortgagePayment;
}

function getPaymentFrequency(schedule: string): number {
  switch (schedule) {
    case "accelerated bi-weekly":
    case "bi-weekly":
      return 26;
    case "monthly":
      return 12;
    default:
      throw new Error("Schedule no válido");
  }
}
