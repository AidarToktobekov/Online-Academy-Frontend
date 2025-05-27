import axios from "axios";
import { logout } from "@/redux/slices/usersSlice"
import {API_URL} from "./constant";
import {toast} from "react-toastify";
import {Store} from "redux";
import {RootState} from "@/redux/store";

const axiosApi = axios.create({
    baseURL: API_URL,
});

let isToastVisible = false;

export const addInterceptor = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((request)=>{
        const token = store.getState().user.user?.access_token;
        if(token){
            request.headers.set("Authorization", `Bearer ${token}`);
        }
        return request;
    });

    axiosApi.interceptors.response.use(
        (response)=>response,
        (error) => {
            if (error.response && error.response.status === 401) {
                store.dispatch(logout());
                if(!isToastVisible){
                    toast.error("Произошла ошибка пройдите авторизацию");
                    isToastVisible = true;
                }
            }
            return Promise.reject(error);
        }
    );
};

export default axiosApi;