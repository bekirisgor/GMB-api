import React, { useState, useEffect, createRef, useRef } from "react";
import { formik } from "formik";
import {
  Card,
  Image,
  Rating,
  Form,
  TextArea,
  FormTextArea,
  FormGroup
} from "semantic-ui-react";
import { number } from "prop-types";
const num = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE"];

var ReviewCard = props => {
  const value = props.data;
  const [TextAreaInput, setTextAreaInput] = useState("");
  const [isReplyValid, setReplyValid] = useState(false);
  const [buttonName, setButtonName] = useState("Edit");
  var Reply = ["ss"];
  var Comment = [value.comment];
  var text = useRef();
  useEffect(() => {
    if ("reviewReply" in value) {
      Reply = value.reviewReply.comment.split("(Translated by Google)");

      setReplyValid(true);
    }
  }, [props]);
  if (value.comment) Comment = value.comment.split("(Translated by Google)");
  if ("reviewReply" in value)
    Reply = value.reviewReply.comment.split("(Translated by Google)");

  const handleSubmit = (event, value) => {
    event.preventDefault();
    props.onSubmitForm(TextAreaInput);
  };

  return (
    <Card key={value.name} style={{ width: "1600px", marginLeft: "280px" }}>
      <Card.Content>
        <Image
          floated="left"
          size="mini"
          src={value.reviewer.profilePhotoUrl}
        />
        <Card.Header>{value.reviewer.displayName}</Card.Header>
        <Card.Meta>
          <span className="date">{timeSince(value.createTime)} ago.</span>
        </Card.Meta>

        <Card.Description>
          {Comment[0]}
          <br />
          <br />
        </Card.Description>

        <br />
        <Rating
          key={value.name}
          defaultRating={num.indexOf(value.starRating)}
          maxRating={5}
          disabled
          size="small"
        />
      </Card.Content>

      <Card.Content>
        <Form onSubmit={handleSubmit}>
          {isReplyValid ? (
            <Form.Field>
              <Form.TextArea
                style={{
                  backgroundColor: "#f0f0f0",
                  pointerEvents: "none",
                  opacity: true
                }}
                value={Reply[0]}
              />
            </Form.Field>
          ) : (
            <Form.Field>
              <Form.TextArea
                value={TextAreaInput}
                onChange={(event, value) => setTextAreaInput(value.value)}
                placeholder="Reply"
              />
            </Form.Field>
          )}
          <Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form.Group>
          <Form.Button
            type="button"
            onClick={() => {
              setReplyValid(!isReplyValid);
              setButtonName(buttonName === "Edit" ? "Cancel" : "Edit");
            }}
          >
            {buttonName}
          </Form.Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

const timeSince = date => {
  var seconds = Math.floor((new Date() - Date.parse(date)) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export default ReviewCard;
