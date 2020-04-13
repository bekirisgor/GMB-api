import React, { Component } from 'react';
import { Icon, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import moment from 'moment';
import _ from 'lodash';

import { fetchAccounts, fetchLocations, setVisibleLocations } from './action';
import LocationGroup from '../../component/LocationGroup/locationGroup';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.time.groupsTime, moment().diff(this.props.groupsTime, 'hours'));
    if (
      this.props.time.groupsTime === undefined ||
      moment().diff(this.props.groupsTime, 'hours') > 12
    )
      this.props.fetchLocations();
  }

  handleRefresh = (event) => {
    event.preventDefault();
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    event.persist();
    const key = _.keys(this.props.locations);
    const selected = [];
    key.forEach((item) => {
      if (event.target.elements[item].checked === true) selected.push(item);
    });
    this.props.setVisibleLocations(selected);
  };

  render() {
    const { accounts, locations, time, loading } = this.props;
    console.log(loading);
    return (
      <div style={{ marginLeft: '220px' }}>
        <div>
          <Button icon onClick={this.handleRefresh}>
            <Icon loading={loading} size="large" aria-label="update" name="refresh" />
          </Button>
          <Moment interval={10000} fromNow date={time.groupsTime} />
        </div>
        <Form onSubmit={this.onSubmitForm}>
          {loading < 1
            ? _.values(accounts).map((values) => (
                <LocationGroup loading={loading} account={values} locations={locations} />
              ))
            : 'loading'}
          <Form.Button type="submit" />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.fetch.updateTime,
  accounts: state.fetch.locationGroups,
  locations: state.fetch.locations,
  loading: state.fetch.loading,
  error: state.fetch.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchAccounts, fetchLocations, setVisibleLocations }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
