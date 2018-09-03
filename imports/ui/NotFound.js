import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

export default (props) => (
  <div className="boxed-view">
    <Jumbotron>
      <h1>404 - Page Not Found</h1>
      <p>Can't find the requested page.</p>
      <Link role="button" className="btn btn-primary" to="/">Home</Link>
    </Jumbotron>
  </div>
);
