// form with inputs for monthly income and which rule they would like to follow
// as well as submit and clear buttons
// a dropdown to choose between the 20/4/10 rule and 20/3/8 rule

import React, { useState } from 'react';
import { NumberField } from '../NumberField';
import { Button } from '../Button';
import { CarAffordabilityResultView } from './CarAffordabilityResult';

type Rule = "20/4/10" | "20/3/8";
export type CarAffordabilityResult = {
  monthlyPayment: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  vehiclePricePreTax: number;
  totalVehiclePrice: number;
};
const defaultInterestRate = 5;
const defaultTaxRate = 8.25;
const defaultCarAffordabilityResult: CarAffordabilityResult = {
    monthlyPayment: 0,
    downPayment: 0,
    loanAmount: 0,
    interestRate: 5,
    loanTerm: 48,
    vehiclePricePreTax: 0,
    totalVehiclePrice: 0,
  }

export const CarAffordability: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [rule, setRule] = useState<Rule>('20/4/10');
  const [interestRate, setInterestRate] = useState(defaultInterestRate);
  const [taxRate, setTaxRate] = useState(defaultTaxRate);
  const [additionalDownPayment, setAdditionalDownPayment] = useState(0);
  const [result, setResult] = useState<CarAffordabilityResult>(defaultCarAffordabilityResult);

  const calculate = () => {
    const [downPaymentPercentage, loanTermYears, monthlyPaymentPercentage] = rule.split('/').map(Number);
    // down payment is 20% of the vehicle price
    // monthlyPaymentPercentage is % of monthly income
    const loanTerm = loanTermYears * 12;
    const monthlyPayment = monthlyIncome * (monthlyPaymentPercentage * .01);
    // calculate using the following formula:
    // Loan Amount = Monthly Payment × [(1 - (1 + Monthly Interest Rate)^(-Loan Term in Months)) / Monthly Interest Rate]
    const monthlyInterestRate = interestRate / 100 / 12;
    const loanAmount = monthlyPayment * ((1 - Math.pow(1 + monthlyInterestRate, -loanTerm)) / monthlyInterestRate);
    // using loan amount, tax rate and down payment percentage, calculate total vehicle price
    // down payment is additional down payment + 20% of vehicle price
    const downPayment = additionalDownPayment + (loanAmount / (1 - downPaymentPercentage * .01)) * (1 + (taxRate * .01));
    const vehiclePricePreTax = (loanAmount + downPayment) / (1 + (taxRate * .01)) ;
    const totalVehiclePrice = loanAmount + downPayment;


    setResult({
      monthlyPayment,
      downPayment,
      loanAmount,
      interestRate,
      loanTerm,
      vehiclePricePreTax,
      totalVehiclePrice,
    });
  }

  const clear = () => {
    setMonthlyIncome(0);
    setInterestRate(defaultInterestRate);
    setTaxRate(defaultTaxRate);
    setResult(defaultCarAffordabilityResult);
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h2>Car Affordability Calculator</h2>
      <label htmlFor="rule">Rule</label>
      <select value={rule} onChange={(e) => setRule(e.target.value as Rule)}>
        <option value="20/4/10">20/4/10</option>
        <option value="20/3/8">20/3/8</option>
      </select>
      <label htmlFor="monthlyIncome">Monthly Income</label>
      <NumberField value={monthlyIncome} onChange={setMonthlyIncome} />
      <label htmlFor="interestRate">Interest Rate</label>
      <NumberField value={interestRate} onChange={setInterestRate} />
      <label htmlFor="taxRate">Tax Rate</label>
      <NumberField value={taxRate} onChange={setTaxRate} />
      <label htmlFor="additionalDownPayment">Additional Down Payment</label>
      <NumberField value={additionalDownPayment} onChange={setAdditionalDownPayment} />
      <div style={{justifyContent: "space-around", display: "flex", margin: ".4em"}}>
        <Button text="Calculate" onClick={calculate} />
        <Button text="Clear" onClick={clear} />
      </div>
      <CarAffordabilityResultView {...result} />
    </div>
  )
}
