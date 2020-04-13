import React from 'react';
import { Card, List, Checkbox, Form } from 'semantic-ui-react';

const LocationGroup = (props) => {
  const { account, locations, loading } = props;

  const handleCheckboxChange = (event) => {
    /*  event.persist();
    console.log(event, event.target.checked);
    */
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {account.accountName} Total Location: {account.locationsID.length}
        </Card.Header>
        <Card.Meta> </Card.Meta>
        <Card.Description>
          <List style={{ height: '120px', overflow: 'hidden', overflowY: 'scroll' }}>
            <List.Header content />
            <Checkbox label="Select all" />
            {loading < 1
              ? account.locationsID.map((locationid) => (
                  <List.Item>
                    <List.Content>
                      <Form.Checkbox id={locationid} label={locations[locationid].locationName} />

                      <List.Icon as="a" name="map marker alternate" />
                    </List.Content>
                  </List.Item>
                ))
              : null}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default LocationGroup;
