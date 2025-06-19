"use client";
import {AppBar, Container, Grid, Link} from "@mui/material";
import {useAppSelector} from "@/redux/hooks";

export default function AppToolbar(){

    const { user } = useAppSelector(state => state.user);
  console.log(user);

    return(
        <>
            <AppBar position="static" sx={{
                padding: '15px 0'
            }}>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center" wrap="nowrap">
                        <Link href="/" sx={{
                            color: "#fff"
                        }}>
                            Online Academy
                        </Link>
                        <Grid sx={{
                            maxWidth: "500px",
                            width: "100%"
                        }}>
                            <input
                                type="text"
                                className="w-full bg-white p-2 text-black rounded-xl focus:outline-1 outline-sky-950"
                                placeholder="Search course"
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Link href={"/about-us"} sx={{
                                color: "#fff"
                            }}>
                                About us
                            </Link>
                            <Link href={"/login"} sx={{
                                color: "#fff"
                            }}>
                                Log-in
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </>
    )
}