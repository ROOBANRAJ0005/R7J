// import { Link } from "react-router-dom";

// export default function CheckoutSteps({shipping, confirmOrder, payment}) {
//     return (

//         <div className="checkout-progress d-flex justify-content-center mt-5">
//             {
//             shipping ?
//             <Link to="/shipping">
//                 <div className="triangle2-active"></div>
//                 <div className="step active-step">Shipping Info</div>
//                 <div className="triangle-active"></div>
//             </Link>:
//              <Link to="/shipping">
//                 <div className="triangle2-incomplete"></div>
//                 <div className="step incomplete">Shipping Info</div>
//                 <div className="triangle-incomplete"></div>
//              </Link>
//             }

//             { confirmOrder ?
//             <Link to="/order/confirm">
//                 <div className="triangle2-active"></div>
//                 <div className="step active-step">Confirm Order</div>
//                 <div className="triangle-active"></div>
//             </Link>:
//              <Link to="/order/confirm">
//                 <div className="triangle2-incomplete"></div>
//                 <div className="step incomplete">Confirm Order</div>
//                 <div className="triangle-incomplete"></div>
//              </Link>
//             }

            
//             { payment ?
//             <Link to="/payment">
//                 <div className="triangle2-active"></div>
//                 <div className="step active-step">Payment</div>
//                 <div className="triangle-active"></div>
//             </Link>:
//              <Link to="/payment">
//                 <div className="triangle2-incomplete"></div>
//                 <div className="step incomplete">Payment</div>
//                 <div className="triangle-incomplete"></div>
//              </Link>
//             }
    
//       </div>
//     )
// }

import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  // Which step is active? 1 = Shipping, 2 = Confirm, 3 = Payment
  const active =
    payment ? 3 : confirmOrder ? 2 : shipping ? 1 : 0;

  // Fill width for the progress bar between circles
  const fillWidth = active <= 1 ? "0%" : active === 2 ? "50%" : "100%";

  const Step = ({ index, label, to }) => {
    const completed = active > index;
    const isActive = active === index;

    // make all steps linkable; disable future steps if you prefer
    const Wrapper = ({ children }) =>
      to ? <Link to={to} className="step-link">{children}</Link> : <>{children}</>;

    return (
      <Wrapper>
        <div className={`step2 ${completed ? "completed" : ""} ${isActive ? "active" : ""}`}>
          <div className="circle">{index}</div>
          <div className="label">{label}</div>
        </div>
      </Wrapper>
    );
  };

  return (
    <div className="checkout-steps2">
      {/* background track */}
      <div className="bar"><div className="bar-fill" style={{ width: fillWidth }} /></div>

      <Step index={1} label="Shipping Info" id='shipping' to="/shipping" />
      <Step index={2} label="Confirm Order" to="/order/confirm" />
      <Step index={3} label="Payment" to="/payment" />
    </div>
  );
}
