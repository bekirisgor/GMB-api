import React, { useState } from 'react';
import { Modal, Button, Card } from 'semantic-ui-react';
import axios from 'axios';

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
            meta={JSON.stringify(data.location.latlng)}
            description={JSON.stringify(data.location.address)}
          />
        ))}
      </Modal.Content>
    </Modal>
  );
};

export default RecommendedLocationsModal;
