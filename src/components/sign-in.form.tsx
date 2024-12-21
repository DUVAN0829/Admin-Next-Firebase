"use client"

import Link from "next/link";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/firebase";

const SignInForm = () => {

    //*Manejo formulario
    const formSchema = z.object({
        email: z.string()
            .email('El formato del email no es valido. Ejemplo: duvan@gmail.com')
            .min(1, { message: "Este campo es requerido." }),

        password: z.string()
            .min(6, { message: "la contraseña debe de tener como minimo 6 caracteres" })

    })

    const form = useForm<z.infer<typeof formSchema>>({ //todo: convinar useForm con Zod
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { register, handleSubmit, formState } = form
    const { errors } = formState

    //*Conectarse con usuario
    const onSubmitUser = async (user: z.infer<typeof formSchema>) => {
        console.log(user)

        try {
            const res = await signIn(user) //*todo: Nota -> creamos el usuario en firebase y lo comprobamos con el form
            console.log(res)
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className="flex justify-center mt-4">

            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmitUser)}>

                <section className="flex gap-x-3">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        className="border-2 border-slate-700 rounded-md pl-2"
                        {...register("email")} />

                    <p className="text-red-500">{errors.email?.message}</p>
                </section>

                <section className="flex gap-x-3">
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="*******"
                        className="border-2 border-slate-700 rounded-md pl-2"
                        {...register("password")} />
                    <p className="text-red-500">{errors.password?.message}</p>
                </section>

                <Link
                    href="/forgot-password"
                    className="underline text-blue-900 hover:text-purple-950"
                >Forgot password?</Link>

                <button
                    type="submit"
                    className="bg-blue-700 text-white font-bold py-2 rounded-md hover:bg-blue-900"
                >Sign In</button>

                <section className="flex gap-x-2">
                    <p>You don't have an account?</p>
                    <Link
                        href="/sign-up"
                        className="underline text-blue-900 hover:text-purple-950"
                    >Sign Up</Link>
                </section>

            </form>

        </div>
    );
}

export default SignInForm;