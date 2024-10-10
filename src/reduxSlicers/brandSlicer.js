import axios from "axios";
import BASE_URL from "../enums/BASE_URL";
import { HTTP_ENDPOINT } from "../enums/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../enums/axiosInstance";






export const getAllBrand = createAsyncThunk("category/getAllBrand",
    async(_,{rejectWithValue})=>{
        try {
            const response  = await axiosInstance.get(`${HTTP_ENDPOINT.getAllBrand}`)
            
            return response.data

        } catch (error) {
                return rejectWithValue(error.message)
        }

    }
)


export const updateBrand = createAsyncThunk('brand/updateBrand',
    async(data,{rejectWithValue})=>{

        

        try {
            const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllBrand}/${data.id}`,data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)

        }
    }
)
export const createBrand = createAsyncThunk('brand/createBrand',
    async (data,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllBrand}`,data)
            return response.data
        } catch (error) {
            
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const deleteBrand = createAsyncThunk('brand/deleteBrand',
    async(id,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllBrand}/${id}`)

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data.message)
            
        }
    }
)

const initialState = {
    brand:[],
    brandQuery:[],
    status:'idle',
    error:null,
    showBrandModal:false,
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

export const brandSlice = createSlice({
    name:"brand",
    initialState,
    reducers:{
        brandFilter:(state,action)=>{
                const value  = action.payload
              const isExsist =   state.brandQuery.find(item=>item ==value)
              if(isExsist){
                  state.brandQuery = state.brandQuery.filter(item=>item!== value)

              }else{

                  state.brandQuery =[...state.brandQuery,value]
              }
                
        },
        resetBrandFilter:(state)=>{
            state.brandQuery = []
            state.deleteStatus = 'idle'

        },
        handleShowBrandModal:(state)=>{
            state.showBrandModal = !state.showBrandModal
            state.createStatus = 'idle'
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(getAllBrand.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(getAllBrand.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.brand = action.payload.data
            })
            .addCase(getAllBrand.rejected,(state,action)=>{
                state.error = action.payload
            })
            .addCase(updateBrand.pending,(state)=>{
                state.updateStatus='loading'
            })
            .addCase(updateBrand.fulfilled,(state,action)=>{
                state.updateStatus = 'succeeded'
                state.updateMessage = action.payload.message
            })
            .addCase(updateBrand.rejected,(state,action)=>{
                state.updateMessage = action.payload
                state.updateStatus = 'failed'
                state.error = action.payload,
                state.updateError = action.payload
            })
            .addCase(createBrand.pending,(state)=>{
                state.createStatus='loading'
            })
            .addCase(createBrand.fulfilled,(state,action)=>{
                state.createStatus = 'succeeded'
                state.createMessage = action.payload.message
            })
            .addCase(createBrand.rejected,(state,action)=>{
                state.createMessage = action.payload
                state.createStatus = 'failed'
                state.error = action.payload,
                state.createError = action.payload
            })
            .addCase(deleteBrand.pending,(state)=>{
                state.deleteStatus='loading'
            })
            .addCase(deleteBrand.fulfilled,(state,action)=>{
                state.deleteStatus = 'succeeded'
                state.deleteMessage = action.payload.message
            })
            .addCase(deleteBrand.rejected,(state,action)=>{
                state.deleteMessage = action.payload
                state.deleteStatus = 'failed'
                state.error = action.payload,
                state.deleteError = action.payload
            })
    }
})


export const {brandFilter,resetBrandFilter,handleShowBrandModal} = brandSlice.actions
export default brandSlice.reducer