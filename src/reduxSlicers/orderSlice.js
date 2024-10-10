import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../enums/axiosInstance"
import { HTTP_ENDPOINT } from "../enums/endpoints"


export const getAllOrder = createAsyncThunk('order/getAllOrder',
    async(query,{rejectWithValue})=>{
        
        try {
            const response  = await axiosInstance.get(HTTP_ENDPOINT.getAllOrder,{
                params:query
            })
            return response.data
        } catch (error) {
            return   rejectWithValue(error.response.data.message)
        }
    }
)
export const changeOrderStatus = createAsyncThunk('order/changeOrderStatus',
    async(data,{rejectWithValue})=>{
        try {
            
const status= data.status
            const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllOrder}/${data.id}/status`,{status})
            return response.data
        } catch (error) {
            return   rejectWithValue(error.response.data.message)
        }
    }
)

const initialState = {
    order:[],
    selectedOrderOption:[],
    status:'idle',
    changeStatus:'idle',
    changeError:null,
    error:null
}

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        changeOption:(state,action)=>{
            state.selectedOrderOption = action.payload
        },
        resetAllStatus:(state)=>{
            state.status='idle',
            state.changeStatus='idle',
            state.changeError=null,
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrder.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(getAllOrder.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.order = action.payload.data
        })
        .addCase(getAllOrder.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.payload
        })  
        .addCase(changeOrderStatus.pending,(state)=>{
            state.changeStatus = 'loading'
        })
        .addCase(changeOrderStatus.fulfilled,(state,action)=>{
            state.changeStatus = 'succeeded'
            
        })
        .addCase(changeOrderStatus.rejected,(state,action)=>{
                state.changeStatus = 'failed'
                state.changeError = action.payload
        })      
    }
})


export const {changeOption,resetAllStatus}=orderSlice.actions
export default orderSlice.reducer