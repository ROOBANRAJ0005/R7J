
import './App.css';
import {Routes,Route, useLocation} from 'react-router-dom'
import { Home } from './component/Home';
import { Header } from './component/layouts/Header';
import { Footer } from './component/layouts/Footer';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { ProductDetail } from './component/product/ProductDetail';
import {ProductSearch} from './component/product/ProductSearch';
import { Login } from './component/user/Login';
import { Register } from './component/user/Register';
import { Fragment, useEffect, useState } from 'react';
import { loadUser } from './actions/UserActions';
import { Profile } from './component/user/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfile } from './component/user/UpdateProfile';
import { UpdatePassword } from './component/user/UpdatePassword';
import { ForgotPassword } from './component/user/ForgotPassword';
import ProtectedRoute from './routes/ProtectedRoutes';
import { ResetPassword } from './component/user/ResetPassword';
import Cart from './component/cart/Cart';
import { Shipping } from './component/cart/Shipping';
import { ConfirmOrder } from './component/cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Payment } from './component/cart/Payment';
import { OrderSuccess } from './component/cart/OrderSuccess';
import UserOrders from './component/order/userOrder';
import OrderDetail from './component/order/orderDetails';
import Dashboard from './component/admin/Dashboard';
import { ProductsList } from './component/admin/ProductsList';
import { NewProduct } from './component/admin/NewProduct';
import { UpdateProduct } from './component/admin/UpdateProduct';
import { OrderList } from './component/admin/OrderList';
import UpdateOrder from './component/admin/UpdateOrder';
import UserList from './component/admin/UserList';
import { UpdateUser } from './component/admin/UpdateUser';
import ReviewList from './component/admin/ReviewsList';
import "./App.css";
import bgHome from "./assets/copy_background2.jpg";
import bgAdmin from "./assets/background5.jpg";
import bgAbout   from "./assets/about.jpg";
import "./App.css"; 
import { Intro } from './component/Intro';
import { About } from './component/layouts/About';


function App() {
  const dispatch = useDispatch();
  const [stripeApiKey,setStripeApiKey] = useState("");
  const [showVideo, setShowVideo] = useState(true);
   const { isAuthenticated } = useSelector((state) => state.authState);

   const location = useLocation();

  let background;
  if (location.pathname === "/" || location.pathname.startsWith("/search") ) {
    background = `url(${bgHome})`;
  }else  if (location.pathname.startsWith("/admin")) {
     background = `url(${bgAdmin})`;
  }else if (location.pathname.startsWith("/about")){
    background = `url(${bgAbout})`;
  }

  useEffect(()=>{
    dispatch(loadUser());
    const getStripeApi = async () => {
    try {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("User not logged in, skipping Stripe API fetch");
      } else {
        console.error("Stripe API error:", err);
      }
    }
  };

  if (isAuthenticated) {
    getStripeApi();
  } else {
    setStripeApiKey(""); // clear key when logged out
  }
  },[dispatch,isAuthenticated]);

  return (
    <Fragment>
      {showVideo ? (
        <Intro onEnd={() => setShowVideo(false)} />
      ) : 
      <div className="App" style={{
              backgroundImage: background,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              minHeight: "100vh"
            }} >
            <HelmetProvider>
        
                
                    <Header/>
                  <div className='container container-fluid'>
                    <ToastContainer theme='dark' />
                        <Routes>
                            {/* User Routes */}
                          <Route path='/' element={<Home/>}/>
                          <Route path='/about' element={<About/>}/>
                          <Route path='/product/:id' element={<ProductDetail/>}/>
                          <Route path='/search/:keyword' element={<ProductSearch/>}/>
                          <Route path='/login' element={<Login/>}/>
                          <Route path='/register' element={<Register/>}/>
                          <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                          <Route path='/myprofile/update' element={<UpdateProfile/>}/>
                          <Route path='/myprofile/changepassword' element={<UpdatePassword/>}/>
                          <Route path='/forgot/password' element={<ForgotPassword/>} />
                          <Route path='/password/reset/:token' element={<ResetPassword/>} />
                          <Route path='/cart' element={<Cart/>} />
                          <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
                          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
                            {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />}
                          <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
                          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute>} />
                          <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>} />
                        </Routes>
                        </div>

                        {/* Admin Routes */}
                        <Routes>
                          <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
                          <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductsList/></ProtectedRoute> } />
                          <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
                          <Route path='/admin/product/update/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
                          <Route path='/admin/orders' element={ <ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } />
                          <Route path='/admin/update/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
                          <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
                          <Route path='/admin/update/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
                          <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } />
                        </Routes>
                    <Footer/> 
              
            </HelmetProvider>
      </div>
      } 
    </Fragment>

      
    
  );
}
export default App;
