import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import Private from './Private';
import TitleBar from './TitleBar';
import NoteList from './NoteList';


const Dashboard = props => {
  return (
    <Private redirect="/">
      <TitleBar title="Dashboard" /> 
      <Container className="page-content">
        <NoteList />
      </Container>
    </Private>
  );
};

export default Dashboard;
