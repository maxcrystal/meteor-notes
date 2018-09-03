import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loggedIn: !!Meteor.userId(),
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.refs.input.value.trim();
    let password = this.refs.password.refs.input.value.trim();

    Meteor.loginWithPassword({email}, password, error => {
      if (!error) {
        this.setState({
          error: '',
          loggedIn: !!Meteor.userId(),
        });
      } else {
        this.setState({error: error.reason});
      }
    });
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="boxed-view">
          <Jumbotron>
            <h2>Login</h2>
            {this.state.error ? <Alert color="danger">{this.state.error}</Alert> : undefined}
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Input className="boxed-view__item" type="email" name="email" ref="email" innerRef="input" placeholder="Email" autoComplete="email"/>
                <Input className="boxed-view__item" type="password" name="password" ref="password" innerRef="input" placeholder="Password" autoComplete="current_password"/>
              </FormGroup>
              <Button className="boxed-view__item" color="primary" block>Login</Button>
            </Form>
            <Link className="boxed-view__link" className="" to="/signup">Create an account?</Link>
          </Jumbotron>
        </div>
      );
    } else {
      return <Redirect to="/dashboard" />;
    }
  };
};
