import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../enums/axiosInstance"
import { HTTP_ENDPOINT } from "../enums/endpoints"


const initialState = {
    email:[],
    selectedEmail:[],
    status:'idle',
    error:null,
    sendStatus:'idle',
    sendError:null,
    sendMessage:null
}

export const getAllEmail = createAsyncThunk('email/getAllEmail',
    async(_,{rejectWithValue})=>{

        try {
            const response = await axiosInstance.get(`${HTTP_ENDPOINT.getALLSubscribe}`)
            return response.data
        } catch (error) {
            
            return rejectWithValue(error.response.data.message)
        }

    }
)
export const sendMessageToMail = createAsyncThunk('email/sendMessageToMail',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getALLSubscribe}${HTTP_ENDPOINT.SEND_EMAIL}`,data)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const emailSlice = createSlice({
    name:'email',
    initialState,
    reducers:{
        handleSelectedEmail:(state,action)=>{

            const email = action.payload
            if(email=="all"){
                if(state.selectedEmail.length == state.email.length){
                    state.selectedEmail = []
                }else{

                    state.selectedEmail = state.email.map(item=>item.email)
                }
            }else if(state.selectedEmail.includes(email)){
                    state.selectedEmail = state.selectedEmail.filter(item=>item !==email)
                }else{
                    state.selectedEmail = [...state.selectedEmail,email]
                }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllEmail.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(getAllEmail.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.email = action.payload.data
            
        })
        .addCase(getAllEmail.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
            
        })
        .addCase(sendMessageToMail.pending,(state)=>{
            state.sendStatus = 'loading'
        })
        .addCase(sendMessageToMail.fulfilled,(state,action)=>{
            state.sendStatus = 'succeeded'
            state.sendMessage = action.payload.message
            
        })
        .addCase(sendMessageToMail.rejected,(state,action)=>{
            state.sendStatus = 'failed'
            state.sendError = action.payload
            state.sendMessage = action.payload.message
            
        })
    }
})

export const {handleSelectedEmail} = emailSlice.actions
export default emailSlice.reducer