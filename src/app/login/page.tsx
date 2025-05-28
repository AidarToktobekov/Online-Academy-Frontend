"use client"
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {login} from "@/redux/thunks/usersThunk";
import {Alert, Button, Container, Grid, TextField} from "@mui/material";

const Login = ()=>{
    const dispatch = useAppDispatch();
    const { loginError, loginLoading} = useAppSelector((state=>state.user));
    const [state, setState] = useState({
        email: "",
        password: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState(prev=>({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            const loginMutation = {
                password: state.password.trim(),
                email: state.email.trim(),
            }
            await dispatch(login(loginMutation)).unwrap();
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <div className="h-screen flex items-center">
                <Container maxWidth={"xs"}>
                    <Grid component="form" onSubmit={onSubmit}>
                        <h1 className="text-center mb-5 text-3xl">Логин</h1>
                        {loginError &&
                            <Alert variant={"standard"} color={"error"}>
                                {loginError.message}
                            </Alert>
                        }
                        <div className="my-3">
                            <TextField
                                value={state.email}
                                type={"email"}
                                variant={"outlined"}
                                label={"Email"}
                                name={"email"}
                                className={"w-full"}
                                onChange={handleInputChange}
                                autoComplete="email"
                            />
                        </div>
                        <div className="my-3">
                            <TextField
                                value={state.password}
                                type={"password"}
                                variant={"outlined"}
                                label={"Пароль"}
                                name={"password"}
                                className={"w-full"}
                                autoComplete={"new-password"}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <Button variant={"contained"} type={"submit"} className="w-full" loading={loginLoading}>
                                Сохранить
                            </Button>
                        </div>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default Login;