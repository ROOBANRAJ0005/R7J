import React, { Fragment, useEffect, useState } from 'react';
import { MetaData } from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productsAction'
import { Product } from '../product/Product';
import { Loader } from '../layouts/Loader';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'



export const ProductSearch = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error,productsCount,resPerPage } = useSelector((state) => state.productsState);
  const [currentPage,setCurrentPage]   = useState(1);
  const { keyword } = useParams();
  const [price,setPrice] = useState([1,1000]);
  const [priceChange,setPriceChange] = useState(price);
  const [Category,setCategory] = useState("");
  const [rating,setRating] = useState(0);

  const setCurrentPageNo =(pageNo)=>{
    setCurrentPage(pageNo);
  }
  const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
  ];
  

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
   dispatch(getProducts(currentPage,keyword,priceChange,Category,rating));

  }, [error,dispatch,currentPage,keyword,priceChange,Category,rating]);

  return (
    <Fragment>
      <MetaData title={"Latest Products"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className='col-6 col-md-3 mb-5 mt-5'>
                {/* price filter */}
                <div className='px-5' onMouseUp={()=>setPriceChange(price)}>
                  
                    <Slider 
                      range={true}
                      marks = { { 1: "$1", 1000: "$1000" } }
                      min={1}
                      max={1000}
                      defaultValue={price}
                      onChange={(price)=>{
                        setPrice(price);
                      }}
                       handleRender={
                                 renderProps => {
                                         return (
                                                 <Tooltip 
                                                    overlay={`$${renderProps.props['aria-valuenow']}`}
                                                    visible={renderProps.dragging ? false : undefined}
                                                  >
                                                    <div {...renderProps.props} />
                                                  </Tooltip>
                                                )
                                            }
                                        }
                      />
                </div>

                <hr className="my-5" />        
                {/* Category Filter */}
                 <div className="mt-5">
                  <h3 className="mb-3">Categories</h3> 
                    <ul className="pl-0">
                    {categories.map(category =>
                          <li
                          style={{
                              cursor:"pointer",
                              listStyleType: "none"
                          }}
                          key={category}
                          onClick={()=>{
                            setCategory(category)
                          }}
                          >
                          {category}
                          </li>
                        
                        )}
                        
                    </ul>
                 </div>
                 <hr className="my-5" />        
                {/* Rating Filter */}
                 <div className="mt-5">
                  <h3 className="mb-3">Ratings</h3> 
                    <ul className="pl-0">
                    {[5,4,3,2,1].map(star =>
                          <li
                          style={{
                              cursor:"pointer",
                              listStyleType: "none"
                          }}
                          key={star}
                          onClick={()=>{
                            setRating(star)
                          }}
                          >
                            <div className="rating-outer">
                              <div className="rating-inner" style={{width:`${star*20}%`}}>

                              </div>
                            </div>
                          </li>
                        
                        )}
                        
                    </ul>
                 </div>
              </div>
              <div className='col-6 col-md-9'>
                <div className="row">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <Product key={product._id} col={4} product={product} />
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <h4>No Products Found</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage?
                    <div className="d-flex justify-content-center mt-5">
                          <Pagination
                              activePage={currentPage}
                              itemsCountPerPage={resPerPage}
                              totalItemsCount={productsCount}
                              onChange={setCurrentPageNo}
                              nextPageText="Next"
                              prevPageText="Prev"
                              firstPageText="First"
                              lastPageText="Last"
                              itemClass="page-item"
                              linkClass="page-link" />     
                    </div> : null }
                      

        </Fragment>
      )}
    </Fragment>
  );
};