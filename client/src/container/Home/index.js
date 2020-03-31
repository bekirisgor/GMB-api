import React, { Component } from "react";
import { Card, List, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchAccounts } from "../accounts/action";
import { fetchLocations } from "../locations/actions";

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAccounts();
  }

  render() {
    const { accounts } = this.props;
    return (
      <div style={{ marginLeft: "220px" }}>
        {accounts.map((items) =>
          items.type === "LOCATION_GROUP" ? (
            <Card fluid>
              <Card.Content>
                <Card.Header>{items.accountName}</Card.Header>
                <Card.Meta>
                  <span className="date"> location count</span>
                </Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>
                      <Checkbox />
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
            </Card>
          ) : null,
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  loading: state.accounts.loading,
  error: state.accounts.error,
  reviews: state.reviews.reviews,
  revloading: state.reviews.loading,
  reverror: state.reviews.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchAccounts }, { fetchLocations }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
