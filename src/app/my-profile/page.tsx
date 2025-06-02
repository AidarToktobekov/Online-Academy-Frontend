import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const MyProfile = async ()=>{
    const cookieStore = await cookies();
    const user = cookieStore.get("user");

    if (!user) {
        redirect("/login");
    }

    return(
        <>
            My-profile
        </>
    );
};

export default MyProfile;