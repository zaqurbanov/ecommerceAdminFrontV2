import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../enums/axiosInstance"
import { HTTP_ENDPOINT } from "../enums/endpoints"


const initialState = {
    images:[],
    showImageModal:false,
    status:"idle",
    imageStatus:'idle',
    uploadMessage:null,
    imageDeleteStatus:'idle',
    error:null

}

export const uploadImages = createAsyncThunk('images/uploadImages',
    async(data,{rejectWithValue})=>{
        try {

            const response = await axiosInstance.post(`${HTTP_ENDPOINT.IMAGE_ENDPOINT}`,data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            return response.data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteImage = createAsyncThunk('images/deleteImage',
    async(id,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.delete(`${HTTP_ENDPOINT.IMAGE_ENDPOINT}/${id}`)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)

        }
    }
)



export const imageSlice = createSlice({
    name:'images',
    initialState,
    reducers:{
        handleShowImageModal:(state)=>{
            state.showImageModal = !state.showImageModal
        },
        resetValues:(state)=>{
            state.status="idle",
            state.imageStatus='idle',
            state.uploadMessage=null,
            state.imageDeleteStatus='idle',
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(uploadImages.pending,(state)=>{
            state.status = "loading"
            state.imageStatus = 'loading'
        })
        .addCase(uploadImages.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.imageStatus = 'succeeded'
            state.images = action.payload.data
            state.uploadMessage =action.payload.message
        })
        .addCase(uploadImages.rejected,(state,action)=>{
            state.error = action.payload
            state.status = 'failed'
            state.imageStatus = 'failed'
        })
        .addCase(deleteImage.pending,(state)=>{
            state.status = 'loading'
            state.imageDeleteStatus ='loading' 
            
        })
        .addCase(deleteImage.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.imageDeleteStatus = "succeeded"
            state.uploadMessage = action.payload.message

        })
        .addCase(deleteImage.rejected,(state,action)=>{
            state.status='failed'
            state.imageStatus = 'failed'
            state.imageDeleteStatus = "failed"
            state.error = action.payload.message
        })
    }
    
})

export const {handleShowImageModal,resetValues} = imageSlice.actions
export default   imageSlice.reducer