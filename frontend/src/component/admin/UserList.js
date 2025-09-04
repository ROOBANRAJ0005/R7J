import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"
import { clearDeleteUser, clearUserError } from "../../slices/UserSlice";
import { deleteUser, getUsers } from "../../actions/adminAction";
import { Loader } from "../layouts/Loader";
import { MetaData } from "../layouts/MetaData";

export default function UserList() {
    const { users = [], loading, error, isUserDeleted }  = useSelector((state) => state.userState)

    const dispatch = useDispatch();

    const setUsers = () => {
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
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email : user.email,
                role: user.role ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/update/user/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger py-1 px-2 ml-2">
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
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if(error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: ()=> { dispatch(clearUserError()) }
            })
            return
        }
        if(isUserDeleted) {
            toast('User Deleted Succesfully!',{
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearDeleteUser())
            })
            return;
        }

        dispatch(getUsers())
    },[dispatch, error, isUserDeleted])


    return (
        <div className="row">
            <MetaData title={"All Users"}/>
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10 text-white">
            <h1 className="my-4" style={{color:"rgb(207, 203, 203)"}}>User List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setUsers()}
                        bordered
                        striped
                        className="px-3"
                        id="user_list"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}