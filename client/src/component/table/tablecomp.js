import React, { Component } from "react";
import { Table, Button, TableCell } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchAccounts } from "../../container/accounts/action";
import { bindActionCreators } from "redux";
class TableComp extends Component {
  constructor(props) {
    super(props);
  }

  getKeys = () => {
    console.log("data", this.props.data);

    return _.keys(this.props.data[0]);
  };

  getHeader = () => {
    var keys = this.getKeys();
    return _.map(keys, (key, index) => {
      return (
        <Table.HeaderCell key={key}> {key.toUpperCase()}</Table.HeaderCell>
      );
    });
  };

  getRowsData = () => {
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return (
        <Table.Row key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </Table.Row>
      );
    });
  };

  render() {
    console.log("comp", this.props);

    const { data, error, loading } = this.props;

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
            maxwidth: "300px"
          }}
        >
          <Table.Header>
            <Table.Row>{this.getHeader()}</Table.Row>
          </Table.Header>

          <Table.Body>{this.getRowsData()}</Table.Body>
        </Table>
      </div>
    );
  }
}
const RenderRow = props => {
  return props.keys.map((key, index) => {
    return <Table.Cell key={props.data[key]}> {props.data[key]}</Table.Cell>;
  });
};

export default TableComp;
