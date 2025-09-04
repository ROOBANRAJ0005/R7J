import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Fragment, useEffect } from "react";
import { Loader } from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { adminOrdersAction, deleteAdminOrder} from "../../actions/adminAction";
import { clearAdminDeleteOrder, clearErrorAdmin } from "../../slices/AdminSlice";
import { MetaData } from "../layouts/MetaData";

export const OrderList = () => {
    const { adminOrders = [], loading, error, isOrderDeleted }  = useSelector((state) => state.adminState)

    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        adminOrders.forEach( (order) => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/update/order/${order._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
    })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteAdminOrder(id))
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
        if(isOrderDeleted) {
            toast('Order Deleted Succesfully!',{
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearAdminDeleteOrder())
            })
            return;
        }

        dispatch(adminOrdersAction());
    },[dispatch, error, isOrderDeleted])


    return (
        <div className="row">
            <MetaData title = {"All Orders"} />
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10 text-white">
            <h1 className="my-4">Order List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setOrders()}
                        bordered
                        striped
                        className="px-3"
                        id="orderlist"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}

