import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { toast } from 'react-toastify';

export const CategoryCreate = () => {
  const { customer } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');

  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name }, customer.token);
      setName('');
      toast.success(`${name} is created`);
    } catch (error) {
      if (error.response.status === 400) {
      }
      toast.error(error.response.data);
    }
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

  const laodCategories = async;

  useEffect(() => {}, [third]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <AdminNav />
        </div>
        <div className='col'>
          <h4>Create category</h4>
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
