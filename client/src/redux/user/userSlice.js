import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "../../../../api/controller/user.conroller";
const initialState={
    currentUser:null,
    error:null,
    loading:false,
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.error=null;
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateStart:(state,action)=>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signOut:(state)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=null;
        },
    }
})
export const {signInFailure,signInStart,signInSuccess,updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOut}=userSlice.actions
export default userSlice.reducer