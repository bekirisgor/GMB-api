import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, Image, Rating, Form, TextArea, Button } from 'semantic-ui-react';

const num = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

const ReviewCard = (props) => {
  const { data } = props;

  const [isReplyValid, setReplyValid] = useState(false);

  let Reply = [];
  let Comment = [data.comment];
  useEffect(() => {
    if ('reviewReply' in data) {
      setReplyValid(true);
    }
  }, [data]);
  if (data.comment) Comment = data.comment.split('(Translated by Google)');
  if ('reviewReply' in data) Reply = data.reviewReply.comment.split('(Translated by Google)');

  return (
    <Card fluid key={data.name}>
      <Card.Content>
        <Image floated="left" size="mini" src={data.reviewer.profilePhotoUrl} />
        <Card.Header>{data.reviewer.displayName}</Card.Header>
        <Card.Meta>
          <span className="date">
            {timeSince(data.createTime)}
            ago.
          </span>
        </Card.Meta>

        <Card.Description>
          {Comment[0]}
          <br />
          <br />
        </Card.Description>

        <br />
        <Rating
          key={data.name}
          defaultRating={num.indexOf(data.starRating)}
          maxRating={5}
          disabled
          size="small"
        />
      </Card.Content>

      <Card.Content>
        {isReplyValid ? (
          <Form>
            <Form.Field>
              <Form.TextArea
                style={{
                  backgroundColor: '#f0f0f0',
                  pointerEvents: 'none',
                  opacity: true,
                }}
                value={Reply[0]}
              />
            </Form.Field>

            <Button
              type="button"
              onClick={() => {
                setReplyValid(false);
              }}
            >
              Edit
            </Button>
          </Form>
        ) : (
          <Formik
            initialValues={{ text: Reply[0], key: data.name }}
            validationSchema={Yup.object().shape({
              text: Yup.string()
                .min('4', 'You must input a reply')
                .max('4096', 'Exceed reply limit'),
            })}
            // eslint-disable-next-line react/destructuring-assignment
            onSubmit={props.onSubmitForm}
          >
            {({
              errors,
              handleChange,
              // eslint-disable-next-line no-shadow
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field
                  value={data.text}
                  control={TextArea}
                  name="text"
                  onChange={handleChange}
                />
                {errors.text}

                <Button type="Submit">Submit</Button>
                {Reply[0] ? (
                  <Button
                    type="button"
                    onClick={() => {
                      setReplyValid(true);
                    }}
                  >
                    Cancel
                  </Button>
                ) : null}
              </Form>
            )}
          </Formik>
        )}
      </Card.Content>
    </Card>
  );
};

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - Date.parse(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};

export default ReviewCard;
