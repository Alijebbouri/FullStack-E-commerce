import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Your Website 2023</div>
            <div>
              <p>Privacy Policy Terms &amp; Conditions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}