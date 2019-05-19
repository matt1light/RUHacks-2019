export interface IformFields{
    id: string,
    name: string,
    class: string,
    age: string;
    tasks: { [index:number]:Boolean },
    city: string,
    school: string,
}

export interface IupdateForm{
  type: string,
  formFields: IformFields,
}

export const updateForm = (formFields: IformFields):IupdateForm => ({
  type: 'UPDATE_FORM',
  formFields,
});
