import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = props => {
  const { columns, sortColumn, onSort, movies } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={movies} />
    </table>
  );
};

export default Table;
