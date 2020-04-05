import React, { Component } from 'react';
import { Card, List, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAccounts, fetchLocations } from './action';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
  }

  componentDidMount() {
    this.props.fetchAccounts();
  }

  render() {
    const { accounts } = this.props;

    return (
      <div style={{ marginLeft: '220px' }}>
        {!this.state.fetching
          ? accounts.map((items, index) => (
              <Card fluid>
                <Card.Content>
                  <Card.Header>{items.accountName}</Card.Header>
                  <Card.Meta></Card.Meta>
                  <Card.Description>
                    <List>
                      <List.Item>
                        <Checkbox />
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.fetch.locationGroups,
  locations: state.fetch.locations,
  loading: state.fetch.loading,
  error: state.fetch.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchAccounts, fetchLocations }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
