export interface IformFields{
    id?: string,
    name?: string,
    email?: string,
    class?: string,
    age?: number,
    tasks?: {
        
                bathroom?: boolean,
                cook?: boolean,
                dishes?: boolean,
                drive?: boolean,
                driveway?: boolean,
                feed_pets?: boolean,
                groceries?: boolean,
                laundry?: boolean,
                mop?: boolean,
                mow_lawn?: boolean,
                plants?: boolean,
                trash?: boolean,
                vacuum?: boolean,
                walk_pets?: boolean,
    },
        
        
    city?: string,
    school?: string,
    currentRent?: number,
    idealRent?: number,
    amenities?: string,
}

export interface IupdateForm{
  type: string,
  formFields: IformFields,
}

export const updateForm = (formFields: IformFields):IupdateForm => ({
  type: 'UPDATE_FORM',
  formFields,
});
