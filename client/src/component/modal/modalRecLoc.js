import React, { useState } from 'react';
import { Modal, Button, Card } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';

const RecommendedLocationsModal = (props) => {
  const { accountID } = props;

  const [listRecommendedLocations, setListRecommendedLocations] = useState(null);
  const getRecommendedLocations = async () => {
    await axios
      .get('/locations/recommendedLocations/' + encodeURIComponent(accountID))
      .then((res) => setListRecommendedLocations(res.data));
  };

  return (
    <Modal trigger={<Button>Recommended locations</Button>} onMount={getRecommendedLocations}>
      <Modal.Content>
        {listRecommendedLocations?.map((data) => (
          <Card
            fluid
            header={data.location.locationName}
            meta={data.location.locationKey.placeId}
            description={JSON.stringify(data.location.address)}
          />
        ))}
      </Modal.Content>
    </Modal>
  );
};

export default RecommendedLocationsModal;
