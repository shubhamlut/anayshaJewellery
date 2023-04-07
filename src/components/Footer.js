import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div>
          <ul>
            <li>
              <h3>INFORMATION</h3>
            </li>
            <li>Privacy Policy</li>
            <li>Security Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h3>CUSTOMER CARE</h3>
            </li>
            <li>Jewellery Care Guide</li>
            <li>Delivery & Returns</li>
            <li>Have a question?</li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h3>UNMISTAKABLY ANAYSHA</h3>
            </li>
            <li>About Us</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h3>SOCIAL</h3>
            </li>
            <li>Facebook</li>
            <li>Pinterest</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      {/* <div className="footer-rights">©2023 Anaysha.Co All rights reserved</div> */}
    </div>
  );
};

export default Footer;
