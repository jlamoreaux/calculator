// Display the result of the calculation
// Path: src/components/views/CarAffordibilityResult.tsx

import React from 'react';
import { type CarAffordabilityResult } from './CarAffordability';

type CarAffordabilityResultProps = CarAffordabilityResult;

export const CarAffordabilityResultView: React.FC<CarAffordabilityResultProps> = ({ monthlyPayment, downPayment, loanAmount, interestRate, loanTerm, vehiclePricePreTax, totalVehiclePrice }) => {
  return (
    <>
      <h2>Car Affordability Result</h2>
      <p>Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
      <p>Down Payment: ${downPayment.toFixed(2)}</p>
      <p>Loan Amount: ${loanAmount.toFixed(2)}</p>
      <p>Interest Rate: {interestRate.toFixed(2)}%</p>
      <p>Loan Term: {loanTerm.toFixed(0)} months</p>
      <p>Vehicle Price Pre Tax: ${vehiclePricePreTax.toFixed(2)}</p>
      <p>Total Vehicle Price: ${totalVehiclePrice.toFixed(2)}</p>
    </>
  )
}