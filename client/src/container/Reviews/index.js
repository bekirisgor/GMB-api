/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox, Segment, Grid, Header, Rating, Form } from 'semantic-ui-react';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import { fetchReviews } from '../Home/action';
import ReviewCard from '../../component/reviewCard/reviewCard';

export class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replyValue: '',
      commentValue: '',
      ratingValue: [''],
      filtered: [],
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

    console.log(this.state.filtered);
  }

  /*
  handleonChange = (event, value) => {
    let result = [];
    switch (true) {
      case value.checked === true && value.value === 'comments':
        this.setState({ filterComment: !value.checked });
        result = this.state.filtered.filter((items) => items.comment);
        this.setState({ filtered: result });
        break;
      case value.checked === true && value.value === 'replies':
        this.setState({ filterReply: !value.checked });
        result = this.state.filtered.filter((items) => items.reviewReply);
        this.setState({ filtered: result });
        break;
      default:
        this.setState({ filtered: this.props.reviews });
        break;
    }

    //    this.setState({ filtered: this.props.reviews });
  };
*/
  handleChangeReply = (event, { value }) => {
    this.setState({ replyValue: value });

    switch (this.state.replyValue || this.state.commentValue) {
      case 'All':
        this.setState({ filtered: this.props.reviews });
        break;
    }
  };

  handleChangeComment = (event, { value }) => this.setState({ commentValue: value });

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
                  value="All"
                  checked={this.state.replyValue === 'All'}
                  onChange={this.handleChangeReply}
                />
                <br />
                <Checkbox
                  radio
                  label="Show Only Replied"
                  value="Replied"
                  checked={this.state.replyValue === 'Replied'}
                  onChange={this.handleChangeReply}
                />
                <br />
                <Checkbox
                  radio
                  label="Show Unreplied"
                  value="NoReply"
                  checked={this.state.replyValue === 'NoReply'}
                  onChange={this.handleChangeReply}
                />
              </Grid.Column>
              <Grid.Column>
                <Header>Comments</Header>
                <Form.Field>
                  <Checkbox radio label="Show All" />
                  <br />
                  <Checkbox radio label="Show Comments" />
                  <br />
                  <Checkbox radio label="Show No Comments" />
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
        {_.map(reviews, (items) => (
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
