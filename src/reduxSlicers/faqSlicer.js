import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../enums/BASE_URL";
import { HTTP_ENDPOINT } from "../enums/endpoints";
import axiosInstance from "../enums/axiosInstance";

export const getAllFaq = createAsyncThunk("faq/getAllFaq",
    async(_,{rejectWithValue})=>{
        try {
            const response  = await axiosInstance.get(`${HTTP_ENDPOINT.getAllFaq}`)
            
            return response.data

        } catch (error) {
            console.log(error);
                return rejectWithValue(error.message)
        }

    }
)
export const updateFaq = createAsyncThunk('faq/updateFaq',
    async(data,{rejectWithValue})=>{

        

        try {
            const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllFaq}/${data.id}`,data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)

        }
    }
)
export const createFaq = createAsyncThunk('faq/createFaq',
    async (data,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllFaq}`,data)
            return response.data
        } catch (error) {
            
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const deleteFaq = createAsyncThunk('faq/deleteFaq',
    async(id,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllFaq}/${id}`)

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data.message)
            
        }
    }
)



const initialState = {
    faq:[],
    faqQuery:[],
    status:'idle',
    error:null,
    showFaqModal:false,
    updateStatus:'idle',
    updateMessage:null,
    updateError:null,
    createStatus:'idle',
    createMessage:null,
    createError:null,
    deleteStatus:'idle',

    deleteError:null,
    deleteMessage:null
}
export const faqSlice = createSlice({
    name:"faq",
    initialState,
    reducers:{
       
        resetFaqFilter:(state)=>{
            state.faqQuery = []
            state.status='idle',
            state.error=null,
            state.showFaqModal=false,
            state.updateStatus='idle',
            state.updateMessage=null,
            state.updateError=null,
            state.createStatus='idle',
            state.createMessage=null,
            state.createError=null,
            state.deleteStatus='idle',
        
            state.deleteError=null,
            state.deleteMessage=null

        },
        handleShowFaqModal:(state)=>{
            state.showFaqModal = !state.showFaqModal
            state.createStatus = 'idle'
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(getAllFaq.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(getAllFaq.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.faq = action.payload.data
            })
            .addCase(getAllFaq.rejected,(state,action)=>{
                state.error = action.payload
            })
            .addCase(updateFaq.pending,(state)=>{
                state.updateStatus='loading'
            })
            .addCase(updateFaq.fulfilled,(state,action)=>{
                state.updateStatus = 'succeeded'
                state.updateMessage = action.payload.message
            })
            .addCase(updateFaq.rejected,(state,action)=>{
                state.updateMessage = action.payload
                state.updateStatus = 'failed'
                state.error = action.payload,
                state.updateError = action.payload
            })
            .addCase(createFaq.pending,(state)=>{
                state.createStatus='loading'
            })
            .addCase(createFaq.fulfilled,(state,action)=>{
                state.createStatus = 'succeeded'
                state.createMessage = action.payload.message
            })
            .addCase(createFaq.rejected,(state,action)=>{
                state.createMessage = action.payload
                state.createStatus = 'failed'
                state.error = action.payload,
                state.createError = action.payload
            })
            .addCase(deleteFaq.pending,(state)=>{
                state.deleteStatus='loading'
            })
            .addCase(deleteFaq.fulfilled,(state,action)=>{
                state.deleteStatus = 'succeeded'
                state.deleteMessage = action.payload.message
            })
            .addCase(deleteFaq.rejected,(state,action)=>{
                state.deleteMessage = action.payload
                state.deleteStatus = 'failed'
                state.error = action.payload,
                state.deleteError = action.payload
            })
    }
})


export const {faqFilter,resetFaqFilter,handleShowFaqModal} = faqSlice.actions
export default faqSlice.reducer