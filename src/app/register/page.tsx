"use client"
import {Alert, Button, Container, Grid, styled, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {register} from "@/redux/thunks/usersThunk";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {UserMutation} from "../../../types/usersTypes";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const Register = ()=>{
    const dispatch = useAppDispatch();
    const { registerLoading , registerError} = useAppSelector((state=>state.user));
    const [state, setState] = useState<UserMutation>({
        username: '',
        email: "",
        password: '',
        confirmPassword: '',
        avatar: null,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, files} = e.target;

        setState(prev=>({
            ...prev,
            [name]: name === "avatar" ? (files ? files[0] : null) : value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append("username", state.username.trim());
            formData.append("password", state.password.trim());
            formData.append("confirmPassword", state.confirmPassword.trim());
            formData.append("email", state.email.trim());
            if (state.avatar) {
                formData.append('avatar', state.avatar);
            }
            const user = await dispatch(register(formData)).unwrap();
            await fetch("/api/set-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user,
                })
            });
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
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    name={"avatar"}
                                    onChange={handleInputChange}
                                    multiple
                                />
                            </Button>
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
