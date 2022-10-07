import React from "react";
import Nav from "./nav/Nav";
// import Header from './Header'

const Layout = ({ children }) => (
  <main>
    <Nav />
    {children}
  </main>
);

export default Layout;
