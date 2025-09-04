import { Fragment } from "react"
import Sidebar from "./Sidebar"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../actions/adminAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {toast} from 'react-toastify'
import { clearErrorAdmin, clearProductCreated } from "../../slices/AdminSlice";
import { MetaData } from "../layouts/MetaData";


export const NewProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [stock,setStock] = useState(0);
    const [sellerName,setSellerName] = useState("");
    const [images,setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const {isProductCreated, loading, error} = useSelector((state)=>state.adminState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const onImagesChange = (e) =>{
                const files = Array.from(e.target.files);
                files.forEach(file => {
                    
                    const reader = new FileReader();

                    reader.onload = () => {
                        if(reader.readyState === 2 ) {
                            setImagesPreview(oldArray => [...oldArray, reader.result])
                            setImages(oldArray => [...oldArray, file])
                        }
                    }

                    reader.readAsDataURL(file);
                })

    }

     const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name' , name);
        formData.append('price' , price);
        formData.append('stock' , stock);
        formData.append('description' , description);
        formData.append('seller' , sellerName);
        formData.append('category' , category);
        images.forEach (image => {
            formData.append('images', image)
        })
        dispatch(createNewProduct(formData))
    }
     useEffect(() => {
        if(isProductCreated) {
            toast('Product Created Succesfully!',{
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }

        if(error)  {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: ()=> { dispatch(clearErrorAdmin()) }
            })
            return
        }
    }, [isProductCreated, error, dispatch,navigate])

  

  return (
        <div className="row">
            <MetaData title={"Create Product"}/>
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4" style={{color:"rgb(207, 203, 203)"}}>Create New Product</h1>
                <Fragment>
                       <div className="wrapper my-5"> 
                            <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler} id="new_product">
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description_field" 
                                        rows="8"
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                        ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" onChange={e => setCategory(e.target.value)}    >
                                        {
                                            categories.map((category)=>(
                                                <option key={category} value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    min="1"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                    />
                                </div>
                                
                                <div className='form-group'>
                                    <label>Images</label>
                                    
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                id='customFile'
                                                multiple
                                                onChange={onImagesChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Images
                                            </label>
                                        </div>
                                         {imagesPreview.map(image => (
                                        <img
                                            className="mt-3 mr-2"
                                            key={image}
                                            src={image}
                                            alt={name}
                                            width="55"
                                            height="52"
                                        />
                                    ))}
                                </div>

                    
                                <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                                >
                                CREATE
                                </button>

                            </form>
                        </div>
                </Fragment>
            </div>
        </div>
  )
}
