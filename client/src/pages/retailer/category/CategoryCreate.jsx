import React, { useEffect, useState } from 'react';
import RetailerNav from '../../../components/nav/RetailerNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewCategory,
  getAllCategory,
  deleteACategory,
} from '../../../redux/slices/categorySlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

export const CategoryCreate = () => {
  const { customer, category } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [keyword, setkeyword] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      token: customer.token,
    };
    dispatch(createNewCategory(data));
    setName('');
  };

  const handleDelete = async (slug) => {
    const data = {
      slug,
      token: customer.token,
    };
    const questionDelete = window.confirm('Do you really want to delete?');
    if (questionDelete) {
      dispatch(deleteACategory(data));
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <RetailerNav />
        </div>
        <div className='col'>
          <h4>Create category</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setkeyword={setkeyword} />
          {category.categoryList?.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <span
                onClick={() => handleDelete(c.slug)}
                className='btn btn-sm float-right'
              >
                {<AiOutlineDelete className='text-danger' />}
              </span>
              <span className='btn btn-sm float-right'>
                <Link to={`/retailer/category/${c.slug}`}>
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

export default CategoryCreate;
