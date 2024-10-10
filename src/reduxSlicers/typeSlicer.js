import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { HTTP_ENDPOINT } from "../enums/endpoints";
import BASE_URL from "../enums/BASE_URL";
import axios from "axios";
import axiosInstance from "../enums/axiosInstance";



export const getAllType = createAsyncThunk("category/getAllType",
    async(_,{rejectWithValue})=>{
        try {
            const response  = await axiosInstance.get(`${HTTP_ENDPOINT.getAllType}`)
            
            return response.data

        } catch (error) {
            
                return rejectWithValue(error.message)
        }

    }
)
export const updateType = createAsyncThunk('type/updateType',
    async(data,{rejectWithValue})=>{

        

        try {
            const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllType}/${data.id}`,data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)

        }
    }
)
export const createType = createAsyncThunk('type/createType',
    async (data,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllType}`,data)
            return response.data
        } catch (error) {
            
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const deleteType = createAsyncThunk('type/deleteType',
    async(id,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllType}/${id}`)

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data.message)
            
        }
    }
)




const initialState = {
    type:[],
    typeQuery:[],
    status:'idle',
    error:null,
    showTypeModal:false,
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


export const typeSlice = createSlice({
    name:"type",
    initialState,
    reducers:{
        typeFilter:(state,action)=>{
            const value  = action.payload
          const isExsist =   state.typeQuery.find(item=>item ==value)
          if(isExsist){
              state.typeQuery = state.typeQuery.filter(item=>item!== value)

          }else{

              state.typeQuery =[...state.typeQuery,value]
          }
            
    },
    resetTypeFilter:(state)=>{
        state.typeQuery = [],
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
    handleShowTypeModal:(state)=>{
        state.showTypeModal = !state.showTypeModal
        state.createStatus = 'idle'
    }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllType.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(getAllType.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.type = action.payload.data
        })
        .addCase(getAllType.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(updateType.pending,(state)=>{
            state.updateStatus='loading'
        })
        .addCase(updateType.fulfilled,(state,action)=>{
            state.updateStatus = 'succeeded'
            state.updateMessage = action.payload.message
        })
        .addCase(updateType.rejected,(state,action)=>{
            state.updateMessage = action.payload
            state.updateStatus = 'failed'
            state.error = action.payload,
            state.updateError = action.payload
        })
        .addCase(createType.pending,(state)=>{
            state.createStatus='loading'
        })
        .addCase(createType.fulfilled,(state,action)=>{
            state.createStatus = 'succeeded'
            state.createMessage = action.payload.message
        })
        .addCase(createType.rejected,(state,action)=>{
            state.createMessage = action.payload
            state.createStatus = 'failed'
            state.error = action.payload,
            state.createError = action.payload
        })
        .addCase(deleteType.pending,(state)=>{
            state.deleteStatus='loading'
        })
        .addCase(deleteType.fulfilled,(state,action)=>{
            state.deleteStatus = 'succeeded'
            state.deleteMessage = action.payload.message
        })
        .addCase(deleteType.rejected,(state,action)=>{
            state.deleteMessage = action.payload
            state.deleteStatus = 'failed'
            state.error = action.payload,
            state.deleteError = action.payload
        })
}
})


export const {typeFilter,resetTypeFilter,handleShowTypeModal} = typeSlice.actions
export default typeSlice.reducer