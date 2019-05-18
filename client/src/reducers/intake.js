import React from 'react';

const intakeReducerDefaultState = {
  name: '',
  class: '',
  age: '',
  tasks: [],
  base_rent: '',
  distance: '',
  city: '',
  school: '',
};

export const intakeReducer = (state = intakeReducerDefaultState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        ...action.formFields
      };
    default:
      return state;
  }
};

export default intakeReducer;