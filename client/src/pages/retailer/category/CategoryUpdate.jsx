import React, { useState, useEffect } from 'react';
import RetailerNav from '../../../components/nav/RetailerNav';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateACategory } from '../../../redux/slices/categorySlice';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = () => {
  const { customer } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState(slug);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      slug,
      name,
      token: customer.token,
    };
    dispatch(updateACategory(data));
    setName('');
    navigate('/retailer/category');
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <RetailerNav />
        </div>
        <div className='col'>
          <h4>Update category</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
