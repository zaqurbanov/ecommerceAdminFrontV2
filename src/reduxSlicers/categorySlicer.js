import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../enums/BASE_URL";
import { HTTP_ENDPOINT } from "../enums/endpoints";
import axiosInstance from "../enums/axiosInstance";

export const getAllCategory = createAsyncThunk("category/getAllCategory",
    async(_,{rejectWithValue})=>{
        try {
            const response  = await axiosInstance.get(`${HTTP_ENDPOINT.getAllCategory}`)
            
            return response.data

        } catch (error) {
            
                return rejectWithValue(error.message)
        }

    }
)

export const updateCategory = createAsyncThunk('category/updateCategory',
    async(data,{rejectWithValue})=>{

        

        try {
            const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllCategory}/${data.id}`,data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)

        }
    }
)
export const createCategory = createAsyncThunk('category/createCategory',
    async (data,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllCategory}`,data)
            return response.data
        } catch (error) {
            
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const deleteCategory = createAsyncThunk('category/deleteCategory',
    async(id,{rejectWithValue})=>{
        
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllCategory}/${id}`)

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data.message)
            
        }
    }
)


const initialState = {
    category:[],
    categoryQuery:[],
    status:'idle',
    error:null,
    showCategoryModal:false,
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
export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        categoryFilter:(state,action)=>{
                const value  = action.payload
              const isExsist =   state.categoryQuery.find(item=>item ==value)
              if(isExsist){
                  state.categoryQuery = state.categoryQuery.filter(item=>item!== value)

              }else{

                  state.categoryQuery =[...state.categoryQuery,value]
              }
                
        },
        resetCategoryFilter:(state)=>{
            state.categoryQuery = []
            state.deleteStatus = 'idle'
        },
        handleShowCategoryModal:(state)=>{
            state.showCategoryModal = !state.showCategoryModal
            state.createStatus = 'idle'
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(getAllCategory.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(getAllCategory.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.category = action.payload.data
            })
            .addCase(getAllCategory.rejected,(state,action)=>{
                state.error = action.payload
            })
            .addCase(updateCategory.pending,(state)=>{
                state.updateStatus='loading'
            })
            .addCase(updateCategory.fulfilled,(state,action)=>{
                state.updateStatus = 'succeeded'
                state.updateMessage = action.payload.message
            })
            .addCase(updateCategory.rejected,(state,action)=>{
                state.updateMessage = action.payload
                state.updateStatus = 'failed'
                state.error = action.payload,
                state.updateError = action.payload
            })
            .addCase(createCategory.pending,(state)=>{
                state.createStatus='loading'
            })
            .addCase(createCategory.fulfilled,(state,action)=>{
                state.createStatus = 'succeeded'
                state.createMessage = action.payload.message
            })
            .addCase(createCategory.rejected,(state,action)=>{
                state.createMessage = action.payload
                state.createStatus = 'failed'
                state.error = action.payload,
                state.createError = action.payload
            })
            .addCase(deleteCategory.pending,(state)=>{
                state.deleteStatus='loading'
            })
            .addCase(deleteCategory.fulfilled,(state,action)=>{
                state.deleteStatus = 'succeeded'
                state.deleteMessage = action.payload.message
            })
            .addCase(deleteCategory.rejected,(state,action)=>{
                state.deleteMessage = action.payload
                state.deleteStatus = 'failed'
                state.error = action.payload,
                state.deleteError = action.payload
            })
    }
})


export const {categoryFilter,resetCategoryFilter,handleShowCategoryModal} = categorySlice.actions
export default categorySlice.reducer