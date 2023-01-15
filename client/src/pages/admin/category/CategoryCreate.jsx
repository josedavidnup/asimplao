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
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button type='submit' className='btn btn-outline-primary'>
          Save
        </button>
      </div>
    </form>
  );
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
