import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import BASE_URL from "../enums/BASE_URL"
import { HTTP_ENDPOINT } from "../enums/endpoints"




const initialState  = {
    user:'',
    status:'idle',
    isActiveUser:sessionStorage.getItem("token")? true:false,
    error:null
}

export const loginUser = createAsyncThunk('user/loginUser',
    async(userData,{rejectWithValue})=>{
        try {
            
            const response  = await axios.post(`${BASE_URL}${HTTP_ENDPOINT.LOGIN_ENDPOINT}`,{
                username:userData.username,
                password: userData.password

            })
         

           

            return response.data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message ||error.message );

        }
    }
)
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logOutUser:(state)=>{
            state.isActiveUser = false
            sessionStorage.removeItem("token")
        },
        setUserActive:(state)=>{
            const token = sessionStorage.getItem("token");
            
                if(token){

                    state.isActiveUser = true;
                }
            
            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status ='succeeded'
            sessionStorage.setItem("token",action.payload.data)
            state.user = action.payload.data
            state.isActiveUser = true

        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.status = "failed"
            state.error = action.payload
        })
    }
})


export const {logOutUser,setUserActive} = userSlice.actions

export default userSlice.reducer