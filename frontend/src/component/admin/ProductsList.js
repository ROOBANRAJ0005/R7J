import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/adminAction";
import { Button } from "react-bootstrap";
import { clearErrorAdmin, clearProductDeleted } from "../../slices/AdminSlice";
import { toast } from "react-toastify";
import { MetaData } from "../layouts/MetaData";

export const ProductsList = () => {
    const { products = [], loading = true, error, isProductDeleted }  = useSelector(state => state.adminState)
    const dispatch = useDispatch();

  

    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }
        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/update/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                         <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })  
        
     

        return data;
    }
        const deleteHandler = (e,productId) =>{
                e.preventDefault();
                dispatch(deleteProduct(productId));
         }

    useEffect(() => {
        if(error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: ()=> { dispatch(clearErrorAdmin()) }
            })
            return
        }
        if(isProductDeleted) {
            toast('Product Deleted Succesfully!',{
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts())
    },[dispatch, error, isProductDeleted])

 
    return (
        <div className="row">
            <MetaData title = {"All Products"} />
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10 text-white">
            <h1 className="my-4">Product List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setProducts()}
                        bordered
                        striped
                        className="px-3"
                        id="product_list"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}