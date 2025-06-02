'use client';
import React from 'react';

interface FilterBoxProps {
  filter: (value: string) => void;
  title: string;
  options: string[];
  value: string;
}

const FilterBox = ({ filter, title, options, value }: FilterBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filter(e.target.value);
  };

  return (
    <div className="max-w-[200px] mb-2 p-1 border-2 border-secondary rounded-lg">
      <label htmlFor="filter" className="block mb-1 text-sm font-medium text-gray-700">
        {title}
      </label>
      <select
        id="filter"
        name="filter"
        onChange={handleChange}
        className="w-full px-2 py-1 rounded"
        value={value}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBox;
