import {useContext} from "react";
import AuthContext from "../../components/user/auth/AuthContext";
import Loading from "../../components/shared/Loading";

const SignOut = () => {

    const {signOut} = useContext(AuthContext)
    signOut()

    return (
        <>
            <Loading/>
        </>
    )
}
export default SignOut