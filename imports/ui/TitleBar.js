import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';


export const TitleBar = (props) => (
  <Navbar className="title-bar">
    <Container>
      <NavbarBrand className="title-bar__brand">{props.title}</NavbarBrand>
      <Nav>
        <NavItem>
          <Button className="title-bar__link" color="link" onClick={() => props.handleLogout()}>Logout</Button>
        </NavItem>
      </Nav>  
    </Container>
  </Navbar>
);

TitleBar.propTypes = {
  'title': PropTypes.string.isRequired,
  'handleLogout': PropTypes.func.isRequired,
};

export default withTracker(props => {
  return {
    handleLogout: () => Meteor.logout(),
  };
})(TitleBar);
