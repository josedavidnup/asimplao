import React, { useEffect, useState } from 'react';
import RetailerNav from '../../../components/nav/RetailerNav';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const ProductCreate = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <RetailerNav />
        </div>
        <div className='col-md-10'>product create form</div>
      </div>
    </div>
  );
};

export default ProductCreate;
