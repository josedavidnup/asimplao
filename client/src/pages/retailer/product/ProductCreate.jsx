import React, { useEffect, useState } from 'react';
import RetailerNav from '../../../components/nav/RetailerNav';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../../redux/slices/productSlice';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getSubCategories } from '../../../functions/category';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subCategory: [],
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
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('Clicked Category: ' + e.target.value);
    setProductValues({
      ...productValues,
      subCategory: [],
      category: e.target.value,
    });
    getSubCategories(e.target.value)
      .then((res) => {
        console.log(res);
        setSubCategoriesOptions(res.data);
        // setProductValues({
        //   ...productValues,
        //   subCategory: res.data,
        // });
      })
      .catch((err) => console.log(err));
    setShowSubCategories(true);
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

  useEffect(() => {
    getCategories().then((res) =>
      setProductValues({ ...productValues, categories: res.data })
    );
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <RetailerNav />
        </div>
        <div className='col-md-10'>
          <h4>Product create</h4>
          <ProductCreateForm
            handleOnSubmit={handleOnSubmit}
            handleOnChange={handleOnChange}
            productValues={productValues}
            handleCategoryChange={handleCategoryChange}
            subCategoriesOptions={subCategoriesOptions}
            showSubCategories={showSubCategories}
            setProductValues={setProductValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
