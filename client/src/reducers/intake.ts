import { IformFields, IupdateForm } from '../actions/intake';

const intakeReducerDefaultState = {
  id: '',
  name: '',
  email: '',
  class: 'student',
  age: '',
  tasks: {
    bathroom: false,
    cook: false,
    dishes: false,
    drive: false,
    driveway:false,
    feed_pets: false,
    groceries: false,
    laundry: false,
    mop: false,
    mow_lawn: false,
    plants: false,
    trash: false,
    vacuum: false,
    walk_pets: false,
  },
  city: '',
  school: '',
};

export const intakeReducer = (state = intakeReducerDefaultState, action: IupdateForm) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        ...action.formFields,
        tasks: {...state.tasks, ...action.formFields.tasks}
      };
    default:
      return state;
  }
};

export default intakeReducer;
