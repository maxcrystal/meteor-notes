import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';


export default class PrivateHeader extends React.Component {
  state = {
    loggedIn: !!Meteor.userId(),
  };

  onLogout() {
    Accounts.logout(error => {
      this.setState({loggedIn: !!Meteor.userId()});
    });
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Navbar className="title-bar">
          <Container>
            <NavbarBrand className="title-bar__brand">{this.props.title}</NavbarBrand>
            <Nav>
              <NavItem>
                <Button className="title-bar__link" color="link" onClick={this.onLogout.bind(this)}>Logout</Button>
              </NavItem>
            </Nav>  
          </Container>
        </Navbar>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

PrivateHeader.propTypes = {
  'title': PropTypes.string.isRequired,
}
