import React from 'react';

const LocalSearch = ({ keyword, setkeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setkeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      className='form-control'
      type='search'
      placeholder='Filter'
      value={keyword}
      onChange={handleSearchChange}
    />
  );
};

export default LocalSearch;
