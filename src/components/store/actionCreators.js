import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios'

export const formValidate = () => ({
    type: 'formValidate'
})

export const changeInputValue = (key, value) => ({
    type: 'changeInputValue',
    key,
    value: fromJS(value)
})

export const formSubmit = (formData) => ({
    type: 'formSubmit',
    formData
})

export const validateComplete = () => ({
    type: 'validateComplete'
})

export const validateIncomplete = () => ({
    type: 'validateIncomplete'
})

export const triggerBack = ()=>({
    type: 'triggerBack'
})

export const postTable = (tableData) => {
    return (dispatch)=>{
        axios.post('http://localhost:5000/payslip/post', {
            tableData: tableData
        }).then((res)=>{
            console.log(res)
            dispatch(triggerBack())
            alert(res.data)
        }).catch((err)=>{
            if(err.response.status ==400){
                alert(err.response.data)
            }
           
        })
            
    }
        
        
}


