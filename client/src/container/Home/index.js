import React, { Component } from 'react';
import {
  Card,
  List,
  Checkbox,
  ListItem,
  ListHeader,
  ListIcon,
  ListContent,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAccounts, fetchLocations } from './action';

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAccounts();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.locations.length === nextProps.locations.length) {
      this.props.accounts.forEach((item, index) => {
        this.props.fetchLocations(item.name, index);
      });
      return false;
    }
    return true;
  }

  render() {
    const { accounts, locations } = this.props;

    return (
      <div style={{ marginLeft: '220px' }}>
        {accounts
          ? accounts.map((account, index) => (
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    {account.accountName} Total Location: {account.locationsID.length}
                  </Card.Header>
                  <Card.Meta> </Card.Meta>
                  <Card.Description>
                    <List style={{ height: '120px', overflow: 'hidden', overflowY: 'scroll' }}>
                      <ListHeader content>
                        <Checkbox label="selectall" />
                      </ListHeader>
                      {locations
                        ? account.locationsID.map((locationid) => (
                            <ListItem>
                              <ListContent fitted>
                                <Checkbox label={locations[locationid].locationName} />

                                <ListIcon as="a" name="map marker alternate" />
                              </ListContent>
                            </ListItem>
                          ))
                        : null}
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
