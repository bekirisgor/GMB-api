/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox, Segment, Grid, Header, Rating, Pagination } from 'semantic-ui-react';
import { produce } from 'immer';
import InfiniteLoading from 'react-simple-infinite-loading';
import _ from 'lodash';
import { fetchReviews, sendReviewReply } from '../Home/action';
import ReviewCard from '../../component/reviewCard/reviewCard';

export class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredReviews: {},
      ratingValue: [],

      filterReply: null,
    };
  }

  componentDidMount() {
    console.log('loc', this.props.visibleLocations);
    const { locations } = this.props;
    const locationID = Object.keys(locations);

    locationID.map((ID) => {
      if (locations[ID].isSelected === true) this.props.fetchReviews(ID);
    });
  }

  filter = (data) => {
    switch (this.state.filterReply) {
      case null:
        this.setState({ filteredReviews: data });
        break;
      case true:
        this.setState({ filteredReviews: _.filter(data, (items) => items.reviewReply) });
        break;
      case false:
        this.setState({ filteredReviews: _.filter(data, (items) => !items.reviewReply) });

        break;
      default:
        break;
    }
  };

  handleSendForm = (event, value) => {
    console.log('event,value', event, value);
    this.props.sendReviewReply(event.text, event.key);
  };

  handleChangeReply = (event, { value }) => {
    this.setState({ filterReply: value }, () => this.filter(this.props.reviews));
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 })),
      });
    }, 1500);
  };

  render() {
    const { loading, reviews } = this.props;

    //  if (loading) return <div>loading</div>;
    console.log(this.state.filtered);
    return (
      <div style={{ marginLeft: '200px' }}>
        <Header textAlign="right">Filter</Header>
        <Segment color="black">
          <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <Header>Reply</Header>
                <Checkbox
                  defaultChecked
                  radio
                  label="Show All"
                  value={null}
                  checked={this.state.filterReply === null}
                  onChange={this.handleChangeReply}
                />
                <br />
                <Checkbox
                  radio
                  label="Show Only Replied"
                  value={true}
                  checked={this.state.filterReply === true}
                  onChange={this.handleChangeReply}
                />
                <br />
                <Checkbox
                  radio
                  label="Show Unreplied"
                  value={false}
                  checked={this.state.filterReply === false}
                  onChange={this.handleChangeReply}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {_.map(this.state.filteredReviews, (items) => (
          <ReviewCard data={items} onSubmitForm={this.handleSendForm} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  visibleLocations: state.fetch.visibleLocationsID,
  time: state.fetch.updateTime,
  locations: state.fetch.locations,
  accounts: state.fetch.locationGroups,
  reviews: state.fetch.reviews,
  loading: state.fetch.loading,
  error: state.fetch.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchReviews, sendReviewReply }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
