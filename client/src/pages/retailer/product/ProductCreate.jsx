import React, { useEffect, useState } from 'react';
import RetailerNav from '../../../components/nav/RetailerNav';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subCaegory: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const { customer } = useSelector((state) => ({ ...state }));
  const [productValues, setProductValues] = useState(initialState);
  const dispatch = useDispatch();
  const {
    title,
    description,
    price,
    categories,
    category,
    subCaegory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = productValues;

  const handleOnChange = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, '--------', e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      productValues,
      token: customer.token,
    };
    dispatch(createNewProduct(data));
    setProductValues({
      ...productValues,
      title: '',
      description: '',
      price: '',
      categories: [],
      category: '',
      subCaegory: [],
      shipping: '',
      quantity: '',
      images: [],
      colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
      brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
      color: '',
      brand: '',
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <RetailerNav />
        </div>
        <div className='col-md-10'>
          <h4>Product create</h4>
          <form onSubmit={handleOnSubmit}>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                className='form-control'
                value={title}
                onChange={handleOnChange}
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                className='form-control'
                value={description}
                onChange={handleOnChange}
              />
            </div>
            <div className='form-group'>
              <label>Price</label>
              <input
                type='number'
                name='price'
                className='form-control'
                value={price}
                onChange={handleOnChange}
              />
            </div>
            {/* <div className='form-group'>
              <label>Category</label>
              <select
                name='category'
                className='form-control'
                onChange={handleOnChange}
              >
                <option>Please select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div> */}
            {/* <div className='form-group'>
              <label>Sub Category</label>
              <input
                type='text'
                name='subCaegory'
                className='form-control'
                value={subCaegory}
                onChange={handleOnChange}
              />
            </div> */}
            <div className='form-group'>
              <label>Shipping</label>
              <select
                name='shipping'
                className='form-control'
                onChange={handleOnChange}
                value={shipping}
              >
                <option value='' disabled>
                  Please select
                </option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Quantity</label>
              <input
                type='number'
                name='quantity'
                className='form-control'
                value={quantity}
                onChange={handleOnChange}
              />
            </div>
            {/* <div className='form-group'>
              <label>Images</label>
              <input
                type='text'
                name='images'
                className='form-control'
                value={images}
                onChange={handleOnChange}
              />
            </div> */}
            <div className='form-group'>
              <label>Color</label>
              <select
                name='color'
                className='form-control'
                onChange={handleOnChange}
                value={color}
              >
                <option value='' disabled>
                  Please select color
                </option>
                {colors?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label>Brand</label>
              <select
                name='brand'
                className='form-control'
                onChange={handleOnChange}
                value={brand}
              >
                <option value='' disabled>
                  Please select brand
                </option>
                {brands?.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <button className='btn btn-outline-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
