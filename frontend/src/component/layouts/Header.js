import React from 'react'
import { Search } from './Search'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Dropdown,Image} from 'react-bootstrap';
import { logoutUser } from '../../actions/UserActions';
   

export const Header = () => {

  const {isAuthenticated,user} = useSelector((state)=>state.authState);
  const { items:cartItems } = useSelector(state => state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async() =>{
    try {
    await dispatch(logoutUser());
    navigate('/');
  } catch (error) {
    console.error("Logout failed:", error); // <-- should print the error message string now
    alert(error); // optional UI feedback
  }
  }
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/"  id="logo" style={{textDecoration:"none",color:"white"}}>
            <img width="40px" src="/images/kitsune.jpg" alt="logo" className='rounded-circle'/> cry baby
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>


         <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex align-items-center">
          { isAuthenticated ? 
            (
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                         <Image width="50px"  src={user.avatar ?? '/images/avatar.jpg'}   />
                    </figure>
                    <span className="ml-2">{user?.name || 'User'}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                       { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
          
          :
            <Link to="/login"  className="btn" id="login_btn">Login</Link>
          }
          <div className="cart_class ml-3">
             <Link to="/cart" id="cart_link"><span id="cart">Cart</span></Link>
             <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </div>
         
        </div>
    </nav>
  )
}
