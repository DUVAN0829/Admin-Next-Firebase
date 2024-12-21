"use client"

import Link from "next/link";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, setDocument, updateUser } from "@/lib/firebase";
import toast from "react-hot-toast";
import { User } from "@/interfaces/user.interface";

const SignUpForm = () => {

    //*Manejo formulario
    const formSchema = z.object({
        uid: z.string(), //todo: no es requerido porque se obtiene luego de crear al usuario
        name: z.string().min(4, { message: "The password must contain at least 4 characters" }),

        email: z.string()
            .email('El formato del email no es valido. Ejemplo: duvan@gmail.com')
            .min(1, { message: "Este campo es requerido." }),

        password: z.string()
            .min(6, { message: "la contraseña debe de tener como minimo 6 caracteres" })

    })

    const form = useForm<z.infer<typeof formSchema>>({ //todo: convinar useForm con Zod
        resolver: zodResolver(formSchema),
        defaultValues: {
            uid: "",
            name: "",
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
            const res = await createUser(user) //*se crea usuario
            await updateUser({ displayName: user.name })
            
            user.uid = res.user.uid

            await createUserInDB(user as User)
            

        } catch (error: any) {
            toast.error(error.message, { duration: 2500 })
        }

    }

    const createUserInDB = async (user: User) => {

        const path = `user/${user.uid}`

        try {

            delete user.password
            await setDocument(path, user)

            toast.success(`Welcome ${user.name}`, {icon: '👋'})

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex justify-center mt-4">

            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmitUser)}>

                <section className="flex gap-x-3">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Jhon Doe"
                        autoComplete="name"
                        className="border-2 border-slate-700 rounded-md pl-2"
                        {...register("name")} />

                    <p className="text-red-500">{errors.name?.message}</p>
                </section>

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

                <button
                    type="submit"
                    className="bg-blue-700 text-white font-bold py-2 rounded-md hover:bg-blue-900"
                >Sign In</button>

                <section className="flex gap-x-2">
                    <p>You have an account?</p>
                    <Link
                        href="/"
                        className="underline text-blue-900 hover:text-purple-950"
                    >Sign In</Link>
                </section>

            </form>

        </div>
    );
}

export default SignUpForm;