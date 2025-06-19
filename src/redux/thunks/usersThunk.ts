import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, IUser, UserLogin, UserMutation} from "../../../types/usersTypes";
import {isAxiosError} from "axios";
import axiosApi from "../../../axiosApi";

export const register = createAsyncThunk< IUser, FormData, {rejectValue: GlobalError}>(
    "users/register",
    async(userMutation, { rejectWithValue })=>{
        try{
            const user = await axiosApi.post("users/register", userMutation, {headers: {"Content-Type": "multipart/form-data"}});

            return user.data;
        }catch(e){
            if(isAxiosError(e) && e.response && e.response.status === 400){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    });

export const login = createAsyncThunk< IUser, UserLogin, {rejectValue: GlobalError}>(
    "users/login",
    async(userLogin, { rejectWithValue })=>{
        try{
            const user = await axiosApi.post("users/login", userLogin, {withCredentials: true});

            return user.data;
        }catch(e){
            if(isAxiosError(e) && e.response && e.response.status === 401){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    });

export const me = createAsyncThunk("users/me", async()=>{
  try{
    const user = await axiosApi.get("users/me", {withCredentials: true},);
    console.log(user, "- route me")
    return user.data;
  }catch (e){
    throw e;
  }
})

export const logout = createAsyncThunk("users/logout", async()=>{
    try{
        return await axiosApi.post("users/logout", {withCredentials: true});
    }catch (e){
        throw e;
    }
})
