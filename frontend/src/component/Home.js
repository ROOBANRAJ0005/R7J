import React, { Fragment, useEffect, useState } from 'react';
import { MetaData } from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsAction';
import { Product } from './product/Product';
import { Loader } from './layouts/Loader';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

export const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error,productsCount,resPerPage } = useSelector((state) => state.productsState);
  const [currentPage,setCurrentPage]   = useState(1);

  const setCurrentPageNo =(pageNo)=>{
    setCurrentPage(pageNo);
  }
  

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
   dispatch(getProducts(currentPage,null,null,null,null));

  }, [error,dispatch,currentPage]);


  return (
    <Fragment>
      <MetaData title={"Latest Products"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row text-center">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3}/>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h4>No Products Found</h4>
                </div>
              )}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage?
                    <div className="d-flex justify-content-center mt-5 Pagination">
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