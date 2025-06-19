"use client"
import {useAppDispatch} from "@/redux/hooks";
import {useEffect} from "react";
import {me} from "@/redux/thunks/usersThunk";

const ClientAuth = ()=>{
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(me());
  }, [])
  return null;
};

export default ClientAuth;