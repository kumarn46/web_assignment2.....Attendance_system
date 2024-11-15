import React from "react";


function Footer() {
  return (
      <footer className="text-muted py-5 border-top mt-5">
          <div className="container">
              <p className="float-end nb-1">
                  <a href="#"> Back to top</a>
              </p>
              <p className="mb-1"> this is footer</p>
              <p className="mb-0">New to app?<a href="/">Visit the homepage</a> or read our<a href="...">getting started guide</a></p>
          </div>
      </footer>

  );
}

export default Footer;