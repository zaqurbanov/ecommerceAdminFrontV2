    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";
    import BASE_URL from "../enums/BASE_URL";
    import { HTTP_ENDPOINT } from "../enums/endpoints";
import axiosInstance from "../enums/axiosInstance";




    export const getAllProduct = createAsyncThunk("product/getAllProduct",
        async(query,{rejectWithValue})=>{
            try {
                const response = await axios.get(`${BASE_URL}${HTTP_ENDPOINT.getAllProduct}`,{
                    params:query
                })
                
                return response.data


            } catch (error) {
            return   rejectWithValue(error.response.data.message)
            }
        }
        
    )


    export const getProductById = createAsyncThunk('product/getProductById',
        async(id,{rejectWithValue})=>{
            try {
                const response = await axiosInstance.get(`${HTTP_ENDPOINT.getAllProduct}/${id}`)

                return response.data
            } catch (error) {
            return  rejectWithValue(error.response.data.message)
            }
        }
    )

    export const deleteProduct = createAsyncThunk('product/deleteProduct',
        async(id,{rejectWithValue})=>{
            try {
                const response  = await axiosInstance.delete(`${HTTP_ENDPOINT.getAllProduct}/${id}`)

                return response.data
            } catch (error) {
                return rejectWithValue(error.response.data.message)
            }
        }
    )

    export const createProduct = createAsyncThunk('product/createProduct',
        async(data,{rejectWithValue})=>{
            try {
                const response = await axiosInstance.post(`${HTTP_ENDPOINT.getAllProduct}`,data,{
                    headers:{
                        "Content-Type": 'multipart/form-data'
                        }
                })
                
                return response.data

            } catch (error) {
                console.log(error);
                return rejectWithValue(error.response.data.message)
            }
        }
    )

    export const updateProductById = createAsyncThunk('product/updateProductById',
        async ({id,formData},{rejectWithValue})=>{
            try {
                console.log(id);
               console.log(formData);
                const response = await axiosInstance.put(`${HTTP_ENDPOINT.getAllProduct}/${id}`,formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                    
                })
                return response.data
            } catch (error) {
                return rejectWithValue(error.response.data.message)

            }
        }
    )

    const initialState = {
        products:[],
        product:{},
        status:'idle',
        createStatus:"idle",
        createError:null,
        productDetailStatus:'idle',
        productDetailError:null,
        error:null,
        productStatus:"idle",
        productError:null,
        productModalShow:false,
        updateStatus:'idle',
        updateError:null,
        updateMessage:null,
        showFilter:false

        
    }


    export const productSlice = createSlice({
        name:"product",
        initialState,
        reducers:{
            handleShowProduct:(state)=>{
                state.productModalShow = !state.productModalShow
            },
            handleshowFilter:(state)=>{
                state.showFilter = !state.showFilter
            },
            resetUpdateStatus: (state) => {
                state.updateStatus = "idle"; 
                state.createError = null;
                state.createStatus = 'idle'
                state.productStatus = 'idle';
                state.productError = null
                state.updateError = null; 
                state.updateMessage = null; 
              },
        },
        extraReducers:(builder)=>{
            builder.addCase(getAllProduct.pending,(state)=>{
                    state.productStatus = "loading"
                    state.status = "loading"
            })
            .addCase(getAllProduct.fulfilled,(state,action)=>{
                state.productStatus = "succeeded"
                state.status = "succeeded"
                state.products = action.payload.data
            })
            .addCase(getAllProduct.rejected,(state,action)=>{
                state.error = action.payload
                state.productError = action.payload
            })
            .addCase(getProductById.pending,(state)=>{
                state.productDetailStatus = "loading"
                state.status = "loading"
            })
            .addCase(getProductById.fulfilled,(state,action)=>{
                state.productDetailStatus = "succeeded"
                state.status = "succeeded"
                state.product =action.payload.data
            })
            .addCase(getProductById.rejected,(state,action)=>{
                state.productDetailError = action.payload.data
                state.error = action.payload.data
            })
            .addCase(deleteProduct.pending,(state)=>{
                state.status = "loading"
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.product =action.payload.data
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.status = "failed"

                state.error = action.payload
            
            })
            .addCase(createProduct.pending,(state)=>{
                state.createStatus = 'loading'
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.createStatus = "succeeded"
                
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.createStatus = "failed"

                state.createError = action.payload
            
            })
            .addCase(updateProductById.pending,(state)=>{
                state.updateStatus = 'loading'

            })
            .addCase(updateProductById.fulfilled,(state,action)=>{
                state.updateStatus = 'succeeded'
                state.updateMessage = action.payload.message
            })
            .addCase(updateProductById.rejected,(state,action)=>{
                state.updateStatus = "failed"
                state.updateMessage = action.payload
                state.updateError = action.payload
            })
        }


        

    })

    export const {handleShowProduct,resetUpdateStatus,handleshowFilter} = productSlice.actions
    export default productSlice.reducer