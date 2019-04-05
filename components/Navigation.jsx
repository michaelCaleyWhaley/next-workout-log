import React, { Fragment } from "react";
import Link from "next/link";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = () => (
  <Fragment>
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="/">Next Workout</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      {/* <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
          <Link href="/about">
            <a className="nav-link">About</a>
          </Link>
        </Nav>
      </Navbar.Collapse> */}
    </Navbar>
  </Fragment>
);

export default Navigation;
