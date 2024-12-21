import SignUpForm from "@/components/sing-up.form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create user"
}

const SignUp = () => {
    return (
        <div>
            <SignUpForm />
        </div>
    );
}

export default SignUp;