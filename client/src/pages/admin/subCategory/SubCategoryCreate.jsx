import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewSubCategory,
  getAllSubCategory,
  deleteASubCategory,
} from '../../../redux/slices/subCategorySlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { getAllCategory } from '../../../redux/slices/categorySlice';

const subCategoryCreate = () => {
  const { customer, subCategory, category } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [keyword, setkeyword] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      category: categorySelected,
      token: customer.token,
    };
    dispatch(createNewSubCategory(data));
    setName('');
  };

  const handleDelete = async (slug) => {
    const data = {
      slug,
      token: customer.token,
    };
    const questionDelete = window.confirm('Do you really want to delete?');
    if (questionDelete) {
      dispatch(deleteASubCategory(data));
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    dispatch(getAllSubCategory());
    dispatch(getAllCategory());
  }, [dispatch]);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <AdminNav />
        </div>
        <div className='col'>
          <h4>Create a Subcategory</h4>

          <div className='form-group'>
            <label> Categories </label>
            <select
              name='category'
              className={'form-control'}
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              <option>Please select</option>
              {category.categoryList.length > 0 &&
                category.categoryList.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setkeyword={setkeyword} />
          {subCategory.subCategoryList?.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <span
                onClick={() => handleDelete(c.slug)}
                className='btn btn-sm float-right'
              >
                {<AiOutlineDelete className='text-danger' />}
              </span>
              <span className='btn btn-sm float-right'>
                <Link to={`/admin/subcategory/${c.slug}`}>
                  <AiOutlineEdit className='text-warning' />
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default subCategoryCreate;
