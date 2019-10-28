import * as constants from './constants';
import { fromJS } from 'immutable';

export const formValidate = ()=>({
    type: 'formValidate'
})

export const changeInputValue = (key, value)=>({
    type: 'changeInputValue',
    key,
    value: fromJS(value)
})

export const formSubmit = (formData)=>({
    type: 'formSubmit',
    formData
})

export const validateComplete = ()=>({
    type: 'validateComplete'
})

export const validateIncomplete = ()=>({
    type: 'validateIncomplete'
})
