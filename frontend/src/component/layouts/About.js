import React from "react";

export const About = () => {
  return (
    <div className="container my-5" style={{color:"rgba(232, 220, 220, 1)"}}>
      <div className="row align-items-center">
        {/* Left Side Image */}
        <div className="col-md-6 mb-4">
          <img
            src="/images/kitsune.jpg"
            alt="Cry Baby Shipping"
            id="about"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Right Side Content */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-4">About Cry Baby</h1>
          <p className="lead">
            Welcome to <strong>Cry Baby</strong>, your trusted partner in
            shipping and e-commerce solutions. Since our launch, we’ve been on a
            mission to make shopping and shipping as seamless, affordable, and
            reliable as possible.
          </p>
          <p>
            Whether you’re shopping for essentials, fashion, or electronics,
            Cry Baby ensures your order reaches you safely and on time. We
            specialize in domestic and international shipping with real-time
            tracking, easy returns, and customer-first policies.
          </p>
          <p>
            Our goal is simple: to connect people and products with speed,
            security, and satisfaction. At Cry Baby, we believe shopping should
            be joyful — and shipping should never make you cry.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row mt-5">
        <div className="col-md-6">
          <h3 className="fw-bold">Our Mission</h3>
          <p>
            To empower every shopper and seller with a hassle-free, transparent,
            and affordable shipping experience.
          </p>
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Our Vision</h3>
          <p>
            To be the most reliable and customer-loved shipping and e-commerce
            platform in the world.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-5">
        <h3 className="fw-bold mb-3">Our Values</h3>
        <ul className="list-unstyled">
          <li>✅ Customer First – We put your satisfaction above all.</li>
          <li>✅ Reliability – On-time delivery, every time.</li>
          <li>✅ Innovation – Smarter, faster, better shipping solutions.</li>
          <li>✅ Sustainability – Eco-friendly packaging and practices.</li>
        </ul>
      </div>
    </div>
  );
};
