import React from 'react';
import { Jumbotron } from 'reactstrap';


export default (props) => {
  const {
    ...attributes
  } = props;

  return (
    <div className="boxed-view">
      <Jumbotron {...attributes}>
        {props.children}
      </Jumbotron>
    </div>
  );
}
