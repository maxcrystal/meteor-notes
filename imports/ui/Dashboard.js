import React from 'react';
import { Container } from 'reactstrap';

import Private from './Private.js';
import TitleBar from './TitleBar.js';


export default (props) => (
  <Private redirect="/">
    <TitleBar title="Dashboard"/> 
    <Container className="page-content">  
      <p>Page Content</p>
    </Container>
  </Private>
);
