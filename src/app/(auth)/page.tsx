
//todo: Página Principal

import SignInForm from "@/components/sign-in.form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to get access to your product list"
}

const AuthPage = () => {
    return (
        <div>
            <SignInForm />
        </div>
    );
}

export default AuthPage;