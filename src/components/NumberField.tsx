import React from 'react';

export interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
}

export const NumberField: React.FC<NumberFieldProps> = ({ value, onChange }) => {
  return (
    <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
  )
}