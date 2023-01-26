import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateACategory,
  getACategory,
} from '../../../redux/slices/categorySlice';

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

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button type='submit' className='btn btn-outline-primary'>
          Save
        </button>
      </div>
    </form>
  );

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
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
