import React from 'react';
import { Container } from 'reactstrap';

import Private from './Private';
import TitleBar from './TitleBar';
import NoteList from './NoteList';


const Dashboard = props => (
  <Private redirect="/">
    <TitleBar title="Dashboard" /> 
    <Container className="page-content">  
      <NoteList />
    </Container>
  </Private>
);

export default Dashboard;
