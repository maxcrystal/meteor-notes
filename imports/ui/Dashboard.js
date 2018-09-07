import React from 'react';
import { Container } from 'reactstrap';

import Private from './Private';
import TitleBar from './TitleBar';
import NoteList from './NoteList';
import Editor from './Editor';


const Dashboard = props => {
  return (
    <Private redirect="/">
      <TitleBar title="Dashboard" /> 
      <Container className="page-content d-flex">
        <Container className="page-content__sidebar border rounded mr-2">
          <NoteList />
        </Container>
        <Container className="page-content__main border rounded">
          <Editor />
        </Container>  
      </Container>
    </Private>
  );
};

export default Dashboard;
