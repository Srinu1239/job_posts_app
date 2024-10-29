import React, { useState, useEffect } from 'react';
import './jobList.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// SearchBar.tsx

// This React functional component renders a search bar with a debounced input feature.
// It accepts an `onSearch` prop function that is triggered whenever the user types,
// passing the input query after a 300ms delay to optimize search performance.
// The component uses `useState` to manage both the input value and a debounced value.
// The `useEffect` hook applies a delay, ensuring `onSearch` is only called after
// the user pauses typing, thus reducing unnecessary calls for every keystroke.



const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

  // Debounce input change by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  // Trigger search whenever the debounced value changes
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input className='searchBar'
      type="text"
      value={inputValue}
      placeholder="Search jobs..."
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default SearchBar;
