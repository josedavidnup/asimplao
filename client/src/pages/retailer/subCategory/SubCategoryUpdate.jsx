import React, { useState, useEffect } from 'react';
import RetailerNav from '../../../components/nav/RetailerNav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateASubCategory } from '../../../redux/slices/subCategorySlice';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getAllCategory } from '../../../redux/slices/categorySlice';
import { getSubCategory } from '../../../functions/subCategory';

const SubCategoryUpdate = () => {
  const { customer, category } = useSelector((state) => ({
    ...state,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      slug,
      name,
      category: parent,
      token: customer.token,
    };
    dispatch(updateASubCategory(data));
    setName('');
    setParent('');
    navigate('/retailer/subcategory');
  };

  const getASubCategory = async () => {
    await getSubCategory(slug).then((sub) => {
      console.log(sub);
      setName(sub.data.name);
      setParent(sub.data.parent);
    });
  };

  useEffect(() => {
    dispatch(getAllCategory());
    getASubCategory();
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <RetailerNav />
        </div>
        <div className='col'>
          <h4>Update a Subcategory</h4>

          <div className='form-group'>
            <label> Categories </label>
            <select
              name='category'
              className={'form-control'}
              onChange={(e) => setParent(e.target.value)}
            >
              {category.categoryList.length > 0 &&
                category.categoryList.map((c) => (
                  <option value={c._id} key={c._id} selected={c._id === parent}>
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
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
