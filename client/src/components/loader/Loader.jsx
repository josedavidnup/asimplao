import React from 'react';
import '../../assets/styles/loader.css';

const Loader = () => {
  return (
    <div className='cart-loader'>
      <div className='graph-loading'>
        <span className='graph-loading__bar'></span>
        <span className='graph-loading__bar'></span>
        <span className='graph-loading__bar'></span>
        <span className='graph-loading__bar'></span>
        <span className='graph-loading__bar'></span>
      </div>
    </div>
  );
};

export default Loader;
