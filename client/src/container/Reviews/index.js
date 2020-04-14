/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox, Segment, Grid, Header, Rating, Form } from 'semantic-ui-react';
import { produce } from 'immer';

import _ from 'lodash';
import { fetchReviews } from '../Home/action';
import ReviewCard from '../../component/reviewCard/reviewCard';

export class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredReviews: {},
      ratingValue: [],
      filtered: ['all', 'all'],
      // eslint-disable-next-line react/no-unused-state
      filterComment: true,
      // eslint-disable-next-line react/no-unused-state
      filterReply: true,
    };
  }

  componentDidMount() {
    console.log('loc', this.props.visibleLocations);
    this.props.visibleLocations.forEach((items) => {
      console.log('item', items);
      this.props.fetchReviews(items);
    });
  }

  filter = (data) => {
    this.state.filtered.forEach((filteropt) => {
      switch (filteropt) {
        case 'all':
          this.setState({ filteredReviews: data });
          break;
        case 'replied':
          this.setState({ filteredReviews: _.filter(data, (items) => items.reviewReply) });
          break;
        case 'noReply':
          this.setState({ filteredReviews: _.filter(data, (items) => !items.reviewReply) });
          break;
        case 'comment':
          this.setState({ filteredReviews: _.filter(data, (items) => items.comment) });
          break;
        case 'noComment':
          this.setState({ filteredReviews: _.filter(data, (items) => !items.comment) });
          break;
        default:
          break;
      }
    });
  };

  handleChangeReply = (event, { value }) => {
    this.setState(
      produce((draft) => {
        draft.filtered[0] = value;
      }),
      () => this.filter(this.props.reviews),
    );
  };

  handleChangeComment = (event, { value }) => {
    this.setState(
      produce((draft) => {
        draft.filtered[1] = value;
      }),
      () => this.filter(this.props.reviews),
    );
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
                  value="all"
                  checked={this.state.filtered[0] === 'all'}
                  onChange={this.handleChangeReply}
                />
                <br />
                <Checkbox
                  radio
                  label="Show Only Replied"
                  value="replied"
                  checked={this.state.filtered[0] === 'replied'}
                  onChange={this.handleChangeReply}
                />
                <br />
                <Checkbox
                  radio
                  label="Show Unreplied"
                  value="noReply"
                  checked={this.state.filtered[0] === 'noReply'}
                  onChange={this.handleChangeReply}
                />
              </Grid.Column>
              <Grid.Column>
                <Header>Comments</Header>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Show All"
                    value="all"
                    checked={this.state.filtered[1] === 'all'}
                    onChange={this.handleChangeComment}
                  />
                  <br />
                  <Checkbox
                    radio
                    label="Show Comments"
                    value="comment"
                    checked={this.state.filtered[1] === 'comment'}
                    onChange={this.handleChangeComment}
                  />
                  <br />
                  <Checkbox
                    radio
                    label="Show No Comments"
                    value="noComment"
                    checked={this.state.filtered[1] === 'noComment'}
                    onChange={this.handleChangeComment}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Header>Rating</Header>
                <Checkbox />
                <Rating icon="star" disabled defaultRating={1} maxRating={5} />
                <br />
                <Checkbox />
                <Rating icon="star" disabled defaultRating={2} maxRating={5} />
                <br />
                <Checkbox />
                <Rating icon="star" disabled defaultRating={3} maxRating={5} />
                <br />
                <Checkbox />
                <Rating icon="star" disabled defaultRating={4} maxRating={5} />
                <br />
                <Checkbox />
                <Rating icon="star" disabled defaultRating={5} maxRating={5} />
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
  accounts: state.fetch.locationGroups,
  reviews: state.fetch.reviews,
  loading: state.fetch.loading,
  error: state.fetch.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchReviews }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
