import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Container from '@mui/material/Container';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth="md">
      <main>{children}</main>
      </Container>
    </Fragment>
  );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
