
import { useLocation, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const location = useLocation();

  // Routes where footer should be minimal and fixed
  const fixedRoutes = [
    "/myprofile",
    "/cart",
    "/order/success",
    "/login",
    "/myprofile/changepassword",
  ];

  if (fixedRoutes.includes(location.pathname)) {
    // Minimal footer for these routes
    return (
      <footer className="py-2 fixed-bottom w-100 bg-dark text-light">
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} Cry Baby - All Rights Reserved
        </p>
      </footer>
    );
  } else {
    // Full footer for all other routes
    return (
      <footer className={`py-2`}>
      <footer className="bg-dark text-light pt-5 mt-5">
        <div className="container">
          <div className="row">

            {/* Shipping Info */}
            <div className="col-md-3 col-sm-6 mb-4">
              <h6 className="text-uppercase fw-bold">Shipping Information</h6>
              <ul className="list-unstyled">
                <li><Link to="/shipping" className="text-decoration-none text-light">Delivery Options</Link></li>
                <li><Link to="/tracking" className="text-decoration-none text-light">Track Your Package</Link></li>
                <li><Link to="/international" className="text-decoration-none text-light">International Shipping</Link></li>
                <li><Link to="/rates" className="text-decoration-none text-light">Rates & Policies</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="col-md-3 col-sm-6 mb-4">
              <h6 className="text-uppercase fw-bold">Customer Service</h6>
              <ul className="list-unstyled">
                <li><Link to="/returns" className="text-decoration-none text-light">Returns & Refunds</Link></li>
                <li><Link to="/support" className="text-decoration-none text-light">Help Center</Link></li>
                <li><Link to="/account" className="text-decoration-none text-light">Your Account</Link></li>
                <li><Link to="/contact" className="text-decoration-none text-light">Contact Us</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-md-3 col-sm-6 mb-4">
              <h6 className="text-uppercase fw-bold">Company</h6>
              <ul className="list-unstyled">
                <li><Link to="/about" className="text-decoration-none text-light">About Cry Baby</Link></li>
                <li><Link to="/careers" className="text-decoration-none text-light">Careers</Link></li>
                <li><Link to="/press" className="text-decoration-none text-light">Press Releases</Link></li>
                <li><Link to="/policies" className="text-decoration-none text-light">Policies</Link></li>
              </ul>
            </div>

            {/* Partner & Social */}
            <div className="col-md-3 col-sm-6 mb-4">
              <h6 className="text-uppercase fw-bold">Partner With Us</h6>
              <ul className="list-unstyled">
                <li><Link to="/sell" className="text-decoration-none text-light">Sell on Cry Baby</Link></li>
                <li><Link to="/affiliate" className="text-decoration-none text-light">Become an Affiliate</Link></li>
                <li><Link to="/advertise" className="text-decoration-none text-light">Advertise Products</Link></li>
                <li><Link to="/partners" className="text-decoration-none text-light">Logistics Partners</Link></li>
              </ul>

              <h6 className="text-uppercase fw-bold mt-4">Connect with Us</h6>
              <ul className="list-unstyled d-flex gap-4">
                <li><Link to="/facebook" className="text-light"><FaFacebook size={22} /></Link></li>
                <li><Link to="/twitter" className="text-light"><FaTwitter size={22} /></Link></li>
                <li><Link to="/instagram" className="text-light"><FaInstagram size={22} /></Link></li>
                <li><Link to="/linkedin" className="text-light"><FaLinkedin size={22} /></Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-top border-secondary mt-4"></div>

        {/* Bottom Bar */}
        <div className="bg-black text-center py-3">
          <p className="mb-1">&copy; {new Date().getFullYear()} Cry Baby - All Rights Reserved</p>
          <div className="small">
            <Link to="/privacy" className="text-decoration-none text-light mx-2">Privacy Policy</Link>|
            <Link to="/terms" className="text-decoration-none text-light mx-2">Terms of Service</Link>|
            <Link to="/sitemap" className="text-decoration-none text-light mx-2">Sitemap</Link>
          </div>
        </div>
      </footer>
      </footer>
    );
  }
};

