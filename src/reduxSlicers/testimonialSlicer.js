import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import axiosInstance from "../enums/axiosInstance"
import { HTTP_ENDPOINT } from "../enums/endpoints"






export const getAllTestimonial = createAsyncThunk('testimonial/getAllTestimonail',
    async(_,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get(`${HTTP_ENDPOINT.getAllTEstimonial}`)

            return response.data
        } catch (error) {
                return rejectWithValue(error.response.data.message)            
        }
    }
)

export const changeTestimonialStatus = createAsyncThunk('testimonial/changeTestimonialStatus',
    async({id,status},{rejectWithValue})=>{
        
        try {
            
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllTEstimonial}${HTTP_ENDPOINT.CHANGE_TESTIMONIAL_STATUS}/${id}`,{status})

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)    
        }
    }
)

export const deleteTestimonial = createAsyncThunk('testimonial/deleteTestimonial',
    async(id,{rejectWithValue})=>{
       
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllTEstimonial}/${id}`)
            console.log(response);
            return response.data
            
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message)    
            
        }
    }
)

const initialState = {
    testimonial:[],
    status:'idle',
    error:null,
    changeStatus:'idle',
    changeError:null,
    deleteStatus:'idle',
    deleteError:null



} 



export const testimonialSlice = createSlice({
    name:'testimonial',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllTestimonial.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(getAllTestimonial.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.testimonial = action.payload.data
        })
        .addCase(getAllTestimonial.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        })
        .addCase(changeTestimonialStatus.pending,(state)=>{
            state.changeStatus = 'loading'
        })
        .addCase(changeTestimonialStatus.fulfilled,(state,action)=>{
            const updatedTestimonial = action.payload.data
            
  state.changeStatus = 'succeeded'
            const index = state.testimonial.findIndex(item=>item._id ==updatedTestimonial._id)
            if (index !== -1) {
                state.testimonial[index] = {...state.testimonial[index],updatedTestimonial}; 
              }
          
           

        })
        .addCase(changeTestimonialStatus.rejected,(state,action)=>{
            state.changeStatus = 'failed'
            state.changeError = action.payload
        })
        .addCase(deleteTestimonial.pending,(state)=>{
            state.deleteStatus = 'loading'
        })
        .addCase(deleteTestimonial.fulfilled,(state,action)=>{
            state.deleteStatus = "succceeded"
            
             
        })
        .addCase(deleteTestimonial.rejected,(state,action)=>{
            state.deleteStatus = 'failed'
            state.deleteError = action.payload
        })
    }
})



export const {}=testimonialSlice.actions
export default testimonialSlice.reducer