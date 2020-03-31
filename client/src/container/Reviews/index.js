/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Checkbox, Segment } from "semantic-ui-react";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import { fetchReviews, sendReviewReply } from "./action";
import ReviewCard from "../../component/reviewCard/reviewCard";

export class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: [],
      // eslint-disable-next-line react/no-unused-state
      filterComment: true,
      // eslint-disable-next-line react/no-unused-state
      filterReply: true,
    };
  }

  componentDidMount() {
    this.props
      .fetchReviews("accounts/115207451364315737681/locations/4439430707710281699")
      .then(() => this.setState({ filtered: this.props.reviews }));
    console.log(this.state.filtered);
  }

  handleonChange(value) {
    let result = [];
    switch (true) {
      case value.checked === true && value.value === "comments":
        this.setState({ filterComment: !value.checked });
        result = this.state.filtered.filter((items) => items.comment);
        this.setState({ filtered: result });
        break;
      case value.checked === true && value.value === "replies":
        this.setState({ filterReply: !value.checked });
        result = this.state.filtered.filter((items) => items.reviewReply);
        this.setState({ filtered: result });
        break;
      default:
        this.setState({ filtered: this.props.reviews });
        break;
    }

    //    this.setState({ filtered: this.props.reviews });
  }

  handleSendForm(event) {
    this.props.sendReviewReply(event.text, event.key);
    console.log("asd", event.text, event.key);
  }

  render() {
    const { loading } = this.props;

    if (loading) return <div>loading</div>;
    console.log(this.state.filtered);
    return (
      <div style={{ marginLeft: "200px", marginBlockStart: "220px" }}>
        <Segment>
          <Checkbox
            label="Show Only With Comments"
            key="comments"
            value="comments"
            onClick={this.handleonChange}
          />
          <Checkbox
            label="Show Only With Reply"
            key="replies"
            value="replies"
            onChange={this.handleonChange}
          />
        </Segment>
        {this.state.filtered.map((items) => (
          <ReviewCard data={items} onSubmitForm={this.handleSendForm} />
        ))}
        )
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reviews: state.reviews.reviews,
  loading: state.reviews.loading,
  error: state.reviews.error,
  reply: state.reviews.reply,
  replyError: state.reviews.replyError,
  replyLoading: state.reviews.replyLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchReviews, sendReviewReply }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
