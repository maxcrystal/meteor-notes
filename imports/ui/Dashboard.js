import React from 'react';
import { Container } from 'reactstrap';

import PrivateHeader from './PrivateHeader.js';


export default (props) => (
  <div>
    <PrivateHeader title="Dashboard"/> 
    <Container className="page-content">  
      <p>Page Content</p>
    </Container>
  </div>
);
