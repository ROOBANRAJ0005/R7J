import React, { Fragment, useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { login ,clearAuthError} from '../../actions/UserActions';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../layouts/Loader';

export const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {error,isAuthenticated} = useSelector((state)=>state.authState);
  const loading = false;

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(login(email,password));
  }

      const redirect = location.search?'/'+location.search.split('=')[1]:'/';

  useEffect(() => {
    if (isAuthenticated) {
        navigate(redirect);
    }

    if (error) {
        toast(error, {
            position: "bottom-center", 
            type: 'error',
            onOpen: () => { dispatch(clearAuthError) } 
        });
    }
}, [error, isAuthenticated, dispatch, navigate,redirect]);


  return (
    <Fragment>
      {loading?<Loader/>:
      <Fragment>
      <div className="row wrapper"> 
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>

                <Link to="/forgot/password" className="float-right mb-4">Forgot Password?</Link>
      
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to ="/register" className="float-right mt-3">New User?</Link>
              </form>
        </div>
      </div>
      </Fragment>
       }
     
    </Fragment>
   
  )
}
