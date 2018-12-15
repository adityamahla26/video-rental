import React, { Component } from "react";
class ListGroup extends Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">Action</li>
        <li className="list-group-item">Comedy</li>
        <li className="list-group-item">Thriller</li>
      </ul>
    );
  }
}

export default ListGroup;
