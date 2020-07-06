import React, { Component } from 'react';
import {
  Icon,
  Button,
  Form,
  Grid,
  List,
  Accordion,
  Segment,
  Dimmer,
  Loader,
  Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';

import { fetchAccounts, fetchLocations, fetchLocation, setVisibleLocations } from './action';
import LocationGroup from '../../component/LocationGroup/locationGroup';
import ModalLocation from '../../component/modal/modalRecLoc';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: '' };
  }

  componentDidMount() {
    this.props.fetchAccounts();

    /*  axios
      .get(
        '/locations/findMatches/' +
          encodeURIComponent('accounts/115207451364315737681/locations/4775488800903419828'),
      )
      .then((res) => console.log('res', res)); */

    /* 
    console.log(this.props.time.groupsTime, moment().diff(this.props.groupsTime, 'hours'));
    if (
      this.props.time.groupsTime === undefined ||
      moment().diff(this.props.groupsTime, 'hours') > 12
    )
      this.props.fetchLocations(); */
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

  handleClick = (e, value) => {
    const { accounts } = this.props;
    const { index } = value;
    const { activeIndex } = this.state;

    if (accounts[index].locationsID.length < 1) {
      console.log('value====valid', index);
      this.props.fetchLocation(index);
    }

    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleSelect = (accountID, option) => {
    const { accounts, locations } = this.props;
    accounts[accountID].locationsID.map((locationID) => {
      if (locations[locationID].isSelected === !option) {
        this.props.setVisibleLocations(locationID, option);
      }
    });
  };

  render() {
    const { accounts, locations, time, loading } = this.props;

    const { activeIndex } = this.state;

    return (
      <div style={{ marginLeft: '220px' }}>
        {/* <div>
          <Button icon onClick={this.handleRefresh}>
            <Icon loading={loading} size="large" aria-label="update" name="refresh" />
          </Button>
          <Moment interval={10000} fromNow date={time.groupsTime} />
        </div> */}
        <Grid columns={1} divided="vertically">
          <Grid.Column>
            {loading.acc !== 'true'
              ? _.values(accounts).map((locationGroups) => (
                  <Segment>
                    <Accordion>
                      <Accordion.Title
                        active={activeIndex === locationGroups.name}
                        index={locationGroups.name}
                        onClick={this.handleClick}
                        content={locationGroups.accountName}
                      />

                      <Icon.Group>
                        <Label>
                          <Icon
                            onClick={() => this.handleSelect(locationGroups.name, true)}
                            color="green"
                            name="add"
                            aria-label="Select ALL"
                          />
                          Select All
                        </Label>
                        <Label>
                          <Icon
                            onClick={() => this.handleSelect(locationGroups.name, false)}
                            color="red"
                            name="close"
                            aria-label="Deselect ALL"
                          />
                          Deselect All
                        </Label>
                      </Icon.Group>

                      <ModalLocation accountID={locationGroups.name} />

                      <Accordion.Content active={activeIndex === locationGroups.name}>
                        {loading[locationGroups.name] !== true ? (
                          <List
                            celled
                            style={{
                              minHeight: '60px',
                              maxHeight: '120px',
                              overflow: 'hidden',
                              overflowY: 'scroll',
                            }}
                          >
                            {locationGroups.locationsID.map((locationid) => (
                              <List.Item
                                onClick={() =>
                                  this.props.setVisibleLocations(
                                    locationid,
                                    !locations[locationid].isSelected,
                                  )
                                }
                              >
                                {locations[locationid].isSelected === true ? (
                                  <List.Icon verticalAlign="middle" color="red" name="close" />
                                ) : (
                                  <List.Icon color="green" name="add" />
                                )}
                                <List.Content>
                                  {locations[locationid].locationName}
                                  {' =>      '}
                                  {locations[locationid].address.locality} /{' '}
                                  {locations[locationid].address.administrativeArea}
                                </List.Content>
                              </List.Item>
                            ))}
                          </List>
                        ) : (
                          <Segment style={{ minHeight: '80px' }} size="big">
                            <Dimmer inverted active>
                              <Loader>Loading</Loader>
                            </Dimmer>
                          </Segment>
                        )}
                      </Accordion.Content>
                    </Accordion>
                  </Segment>
                ))
              : loading}
          </Grid.Column>
        </Grid>

        {/* {<Form onSubmit={this.onSubmitForm}>
          {loading < 1
            ? _.values(accounts).map((values) => (
                <LocationGroup loading={loading} account={values} locations={locations} />
              ))
            : 'loading'}
          <Form.Button type="submit" />
        </Form>} */}
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
  bindActionCreators(
    { fetchAccounts, fetchLocations, fetchLocation, setVisibleLocations },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
