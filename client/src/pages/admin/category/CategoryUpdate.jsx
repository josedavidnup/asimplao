import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateACategory,
  getACategory,
} from '../../../redux/slices/categorySlice';
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
    navigate('/admin/category');
  };

  useEffect(() => {
    dispatch(getACategory(slug));
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <AdminNav />
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
