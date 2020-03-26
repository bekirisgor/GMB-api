import React, { useState, useEffect, createRef, useRef } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  Card,
  Image,
  Rating,
  Form,
  TextArea,
  FormTextArea,
  FormGroup,
  Button
} from "semantic-ui-react";
import { number } from "prop-types";
const num = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE"];

var ReviewCard = props => {
  const value = props.data;
  const [TextAreaInput, setTextAreaInput] = useState("");
  const [isReplyValid, setReplyValid] = useState(false);
  const [buttonName, setButtonName] = useState("Edit");
  var Reply = [];
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
    console.log(event, value);
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
        {isReplyValid ? (
          <Form>
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
            initialValues={{ text: Reply[0], key: value.name }}
            validationSchema={Yup.object().shape({
              text: Yup.string()
                .min("4", "You must input a reply")
                .max("4096", "Exceed reply limit")
            })}
            onSubmit={props.onSubmitForm}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              validateOnChange
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field
                  value={values.text}
                  control={TextArea}
                  name="text"
                  onChange={handleChange}
                ></Form.Field>
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
