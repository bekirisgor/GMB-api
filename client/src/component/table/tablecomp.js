/* eslint-disable react/no-array-index-key */
import React from "react";
import { Table } from "semantic-ui-react";
import _ from "lodash";

const TableComp = (props) => {
  const getKeys = () => {
    console.log("data", props.data);

    return _.keys(props.data[0]);
  };

  const getHeader = () => {
    const keys = getKeys();
    return _.map(keys, (key) => {
      return <Table.HeaderCell key={key}>{key.toUpperCase()}</Table.HeaderCell>;
    });
  };

  const getRowsData = () => {
    const items = props.data;
    const keys = getKeys();
    return items.map((row, index) => {
      return (
        <Table.Row key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </Table.Row>
      );
    });
  };

  console.log("comp", props);

  return (
    <div>
      <Table
        striped
        selectable
        size="small"
        style={{
          marginLeft: "250px",
          width: "900px",
          marginTop: "150px",
          maxwidth: "300px",
        }}
      >
        <Table.Header>
          <Table.Row>{getHeader()}</Table.Row>
        </Table.Header>

        <Table.Body>{getRowsData()}</Table.Body>
      </Table>
    </div>
  );
};

const RenderRow = (props) => {
  return props.keys.map((key) => {
    return <Table.Cell key={props.data[key]}>{props.data[key]}</Table.Cell>;
  });
};

export default TableComp;
