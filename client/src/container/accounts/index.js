import React, { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchAccounts } from "./action";
import { bindActionCreators } from "redux";
import TableComp from "../../component/table/tablecomp";
import { Table, Button, Header } from "semantic-ui-react";
import { withRouter } from "react-router";

export class AccTable extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }
  componentDidMount() {
    this.handlefetchAccounts();
  }
  handleFetchAccounts = () => {
    this.props.fetchAccounts();
  };
  render() {
    const { accounts, loading, error } = this.props;

    return (
      <div>
        loading ? <div>loading</div> : <TableComp data={accounts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  loading: state.accounts.loading,
  error: state.accounts.error
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAccounts }, dispatch);
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccTable)
);
