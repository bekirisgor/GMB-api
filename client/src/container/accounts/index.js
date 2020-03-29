import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import TableComp from '../../component/table/tablecomp';
import { fetchAccounts } from './action';

export class AccTable extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  componentDidMount() {
    this.handlefetchAccounts();
  }

  handleFetchAccounts() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchAccounts();
  }

  render() {
    const { accounts } = this.props;

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
  error: state.accounts.error,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAccounts }, dispatch);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccTable));
