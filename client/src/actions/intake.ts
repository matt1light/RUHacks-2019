export interface IupdateForm{
    type: string,
    formFields[:Boolean],
}

export const updateForm = formFields => ({
  type: 'UPDATE_FORM',
  formFields,
});
