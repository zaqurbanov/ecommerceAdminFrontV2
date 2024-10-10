import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../enums/BASE_URL";
import { HTTP_ENDPOINT } from "../enums/endpoints";
import axiosInstance from "../enums/axiosInstance";

export const getAllSize = createAsyncThunk("size/getAllSize",
    async(_,{rejectWithValue})=>{
        try {
            const response  = await axiosInstance.get(`${HTTP_ENDPOINT.getAllSize}`)
            
            return response.data

        } catch (error) {
            console.log(error);
                return rejectWithValue(error.message)
        }

    }
)
export const updateSize = createAsyncThunk('size/updateSize',
    async(data,{rejectWithValue})=>{

        

        try {
            const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllSize}/${data.id}`,data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)

        }
    }
)
export const createSize = createAsyncThunk('size/createSize',
    async (data,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllSize}`,data)
            return response.data
        } catch (error) {
            
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const deleteSize = createAsyncThunk('size/deleteSize',
    async(id,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllSize}/${id}`)

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data.message)
            
        }
    }
)



const initialState = {
    size:[],
    sizeQuery:[],
    status:'idle',
    error:null,
    showSizeModal:false,
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
export const sizeSlice = createSlice({
    name:"size",
    initialState,
    reducers:{
        sizeFilter:(state,action)=>{
                const value  = action.payload
              const isExsist =   state.sizeQuery.find(item=>item ==value)
              if(isExsist){
                  state.sizeQuery = state.sizeQuery.filter(item=>item!== value)

              }else{

                  state.sizeQuery =[...state.sizeQuery,value]
              }
                
        },
        resetSizeFilter:(state)=>{
            state.sizeQuery = []
            state.status='idle',
            state.error=null,
            state.showSizeModal=false,
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
        handleShowSizeModal:(state)=>{
            state.showSizeModal = !state.showSizeModal
            state.createStatus = 'idle'
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(getAllSize.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(getAllSize.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.size = action.payload.data
            })
            .addCase(getAllSize.rejected,(state,action)=>{
                state.error = action.payload
            })
            .addCase(updateSize.pending,(state)=>{
                state.updateStatus='loading'
            })
            .addCase(updateSize.fulfilled,(state,action)=>{
                state.updateStatus = 'succeeded'
                state.updateMessage = action.payload.message
            })
            .addCase(updateSize.rejected,(state,action)=>{
                state.updateMessage = action.payload
                state.updateStatus = 'failed'
                state.error = action.payload,
                state.updateError = action.payload
            })
            .addCase(createSize.pending,(state)=>{
                state.createStatus='loading'
            })
            .addCase(createSize.fulfilled,(state,action)=>{
                state.createStatus = 'succeeded'
                state.createMessage = action.payload.message
            })
            .addCase(createSize.rejected,(state,action)=>{
                state.createMessage = action.payload
                state.createStatus = 'failed'
                state.error = action.payload,
                state.createError = action.payload
            })
            .addCase(deleteSize.pending,(state)=>{
                state.deleteStatus='loading'
            })
            .addCase(deleteSize.fulfilled,(state,action)=>{
                state.deleteStatus = 'succeeded'
                state.deleteMessage = action.payload.message
            })
            .addCase(deleteSize.rejected,(state,action)=>{
                state.deleteMessage = action.payload
                state.deleteStatus = 'failed'
                state.error = action.payload,
                state.deleteError = action.payload
            })
    }
})


export const {sizeFilter,resetSizeFilter,handleShowSizeModal} = sizeSlice.actions
export default sizeSlice.reducer