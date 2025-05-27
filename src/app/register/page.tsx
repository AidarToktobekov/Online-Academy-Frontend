"use client"
import {Alert, Button, Container, Grid, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {register} from "@/redux/thunks/usersThunk";

const Register = ()=>{
    const dispatch = useAppDispatch();
    const { registerLoading , registerError} = useAppSelector((state=>state.user));
    const [state, setState] = useState({
        username: '',
        email: "",
        password: '',
        confirmPassword: '',
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
            const userMutation = {
                username: state.username.trim(),
                password: state.password.trim(),
                confirmPassword: state.confirmPassword.trim(),
                email: state.email.trim(),
            }
            await dispatch(register(userMutation)).unwrap();
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <div className="h-screen flex items-center">
                <Container maxWidth={"xs"}>
                    <Grid component="form" onSubmit={onSubmit}>
                        <h1 className="text-center mb-5 text-3xl">Регистрация</h1>
                        {registerError &&
                            <Alert variant={"standard"} color={"error"}>
                                {registerError.message}
                            </Alert>
                        }
                        <div className="my-3">
                            <TextField
                                value={state.username}
                                type={"text"}
                                variant={"outlined"}
                                label={"ФИО"}
                                name={"username"}
                                className={"w-full"}
                                onChange={handleInputChange}
                                autoComplete="username"
                            />
                        </div>
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
                            <TextField
                                value={state.confirmPassword}
                                type={"password"}
                                variant={"outlined"}
                                label={"Подтвердите пароль"}
                                name={"confirmPassword"}
                                className={"w-full"}
                                autoComplete={"confirm-password"}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <Button variant={"contained"} type={"submit"} className="w-full" loading={registerLoading}>
                                Сохранить
                            </Button>
                        </div>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default Register;
