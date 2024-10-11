"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Button from "../../Button";
import Heading from "../../Heading";
import Input from "../../inputs/Input";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

 

const LoginModal = () => {
    const registerModal = useRegisterModal(); 
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState(false); 
    const loginModal = useLoginModal(); 

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({defaultValues: {name: '', email: '', password: ''}}); 

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true); 
        signIn('credentials', {
            ...data, redirect: false
        }).then((callback) => {
            setIsLoading(false);
        
        if (callback?.ok) {
            toast.success("Logged in"); 
            router.refresh();

            loginModal.onClose(); 
        }

        if (callback?.error) {
            toast.error(callback.error); 
        }
        })
        }
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Create an account!"/> 
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/> 
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required/> 
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    Do not have an account?
                </div>
                <div onClick={loginModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                    Sign up
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login"
        actionLabel="Continue" onClose={loginModal.onClose} 
        onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
    )


}

export default LoginModal; 