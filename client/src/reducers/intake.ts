import { IupdateForm } from "../actions/intake";
const intakeReducerDefaultState = {
  id: '',
  name: '',
  email: '',
  class: 'student',
  age: -1,
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
type TMP = typeof intakeReducerDefaultState;
interface IntakeFields extends TMP {}
export interface GlobalReduxState {
  intake: IntakeFields; 
}
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
