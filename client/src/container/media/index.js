import React, { useState } from 'react';
import { Form, Select } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import qs from 'querystring';

const options = [
  { key: '1', text: 'Categori seçiniz', value: 'CATEGORY_UNSPECIFIED' },
  { key: '2', text: 'Kapak', value: 'COVER' },
  { key: '3', text: 'Profil', value: 'PROFILE' },
  { key: '4', text: 'Logo', value: 'LOGO' },
  { key: '5', text: 'Dış fotoğraf', value: 'EXTERIOR' },
  { key: '6', text: 'İç fotoğraf', value: 'INTERIOR' },
  { key: '7', text: 'Ürün fotoğrafı', value: 'PRODUCT' },
  { key: '8', text: 'İş fotoğrafı', value: 'AT_WORK' },
  { key: '9', text: 'Yeme ve içme', value: 'FOOD_AND_DRINK' },
  { key: '0', text: 'Menü', value: 'MENU' },
  { key: '11', text: 'Genel alanlar', value: 'COMMON_AREA' },
  { key: '12', text: 'Odalar', value: 'ROOMS' },
  { key: '13', text: 'Ekip', value: 'TEAMS' },
  { key: '14', text: 'Categorisi olmayan', value: 'ADDITIONAL' },
];

export const MediaForm = (props) => {
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      sourceUrl: '',
      description: '',
      locationAssociation: { category: '' },
      mediaFormat: 'PHOTO',
    },
    onSubmit(values) {
      console.log({ ...values });

      _.values(props.locations).map((items) => {
        if (items.isSelected === true) {
          axios.post(
            '/locations/createMedia/',

            { data: { ...values }, locationID: items.name },
            { params: { locationID: items.name } },
          );
        }
      });
    },
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            id="sourceUrl"
            name="sourceUrl"
            label="Photo URL"
            onChange={handleChange}
            value={values.sourceURL}
          />
        </Form.Group>
        <Form.TextArea
          id="description"
          name="description"
          label="Description"
          onChange={handleChange}
          value={values.description}
        />

        <Form.Select
          name="locationAssociation.category"
          label="Categori"
          options={options}
          onChange={(e, { name, value }) => {
            setFieldValue(name, value);
          }}
          value={values.locationAssociation.category}
        />

        <Form.Button children="Gönder" color="teal" label="Submit" />
      </Form>
    </div>
  );
};

/* 
mediaformat:photo
locationAssciation: photo type
description
sourceurl link



*/
const mapStateToProps = (state) => ({
  locations: state.fetch.locations,
});

export default connect(mapStateToProps)(MediaForm);
