import React, { useState } from "react";

function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2023 Karim Lotfy</p>
      <div className="social-icons">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://www.instagram.com/karim.lotfy00/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
