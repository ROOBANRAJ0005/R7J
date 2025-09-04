import {Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReviews, getProductDetails } from '../../actions/ProductAction';
import {Carousel} from 'react-bootstrap'
import {Loader} from '../layouts/Loader'
import { toast } from 'react-toastify';
import { MetaData } from '../layouts/MetaData';
import { addCart } from '../../actions/CartAction';
import {Modal} from 'react-bootstrap';
import { clearErrorProduct, clearProduct, clearReviewSubmitted } from '../../slices/ProductSlice';
import { ProductReviews } from './ProductReviews';



export const ProductDetail = () => {
    const { loading, product = {}, isReviewSubmitted, error} = useSelector((state)=>state.productState);
    const dispatch = useDispatch();
    const {id} = useParams();
    const { user } = useSelector(state => state.authState);
    const [quantity,setQuantity] = useState(1);
    const [productId,setProductId] = useState(product._id?product._id:'');
    
    const increaseQty = () =>{
        let count = document.querySelector('.count');
        if(product.stock === 0 || count.valueAsNumber >= product.stock) return;
        let qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () =>{
        let count = document.querySelector('.count');
        if(count.valueAsNumber === 1) return;
        let qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

     const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReviews(formData))

    }

       useEffect(()=>{
    
        if(isReviewSubmitted) {
            handleClose()
            toast('Review Submitted successfully',{
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearReviewSubmitted())
            })
            
        }
        if(error)  {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: ()=> { dispatch(clearErrorProduct()) }
            })
            return
        }
        if(!productId || isReviewSubmitted) {
            dispatch(getProductDetails(id));
            setProductId("");
        }

        return () => {
            dispatch(clearProduct())
        }
        

    },[dispatch,id,isReviewSubmitted, error, productId]);
  return (
    <Fragment >
        {
            loading?<Loader/>:
            <Fragment>
                <MetaData title={product.name}/>
                <div className='container' >
                <div className="row f-flex justify-content-around" id='product_cart'>
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <Carousel pause="hover">
                            {
                                product.images && product.images.map((image) => {
                                    return (
                                            <Carousel.Item key={image._id}>
                                            <img src={image.image} alt="sdf" height="400" width="400" id="productDetails"/>
                                            </Carousel.Item>
                                            )
                                })

                            }
                        </Carousel>
                    </div>
        
                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product:{product._id}</p>

                        <br/>

                        <div className="rating-outer">
                            <div className="rating-inner"  style={{width:`${product.ratings/5*100}%`}}></div>
                        </div>
                        <span id="no_of_reviews">{product.numOfReviews}</span>

                        <br/>

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                            <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick = {()=>dispatch(addCart(product._id,quantity))}>Add to Cart</button>

                        <br/>
                            <p>Status: <span className={product.stock > 0 ?'greenColor':'redColor'} id="stock_status">{ product.stock > 0 ?'In Stock':'Out of Stock'}</span></p>

                        <br/>

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <br/>
                        <p id="product_seller mb-3">Sold by: <strong>Cry baby</strong></p>
                        
                         { user ?
                            <button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                        Submit Your Review
                            </button> :
                            <div className="alert alert-danger mt-5"> Login to Post Review</div>
                         }
                        
                         <div className="row mt-2 mb-5">
                        <div className="rating w-50">
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul className="stars" >
                                        {
                                            [1,2,3,4,5].map(star => (
                                                <li 
                                                key={star}
                                                value={star}
                                                onClick={()=>setRating(star)}
                                                className={`star ${star<=rating?'orange':''}`}
                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                ><i className="fa fa-star"></i></li>
                                            ))
                                        }
                                       
                                       
                                    </ul>

                                    <textarea  onChange={(e)=>setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                    </textarea>
                                    <button disabled={loading} onClick={reviewHandler}   aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
                                </Modal.Body>
                               
                            </Modal>
                        </div>

                         </div>


                     </div>
                </div>
                 {
                product.reviews && product.reviews.length > 0 ?
                <ProductReviews reviews={product.reviews} /> : null
                }
                </div>
               

            </Fragment>
        }
        
    </Fragment>
    
  )

}
