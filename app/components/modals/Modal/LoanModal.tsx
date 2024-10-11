"use client";
import useLoanModal from "@/app/hooks/useLoanModal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../navbar/Categories";
import Modal from "./Modal";
import Heading from "../../Heading";
import CategoryInput from "../../inputs/CategoryInput";
import Input from "../../inputs/Input";
import Counter from "../../inputs/Counter";
import ImageUpload from "../../inputs/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

 

enum STEPS {
    CATEGORY=0,
    DETAILS=1, 
    INFO=2, 
    IMAGES=3, 
    PLOT=4, 
    PRICE=5
}
const LoanModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); 
    const loanModal = useLoanModal(); 
    const [step, setStep] = useState(STEPS.CATEGORY); 

    const {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm<FieldValues>({defaultValues: {
        category: '', author: '', name: '', publisher: '', format: '', audience: '',  pageCount: 0, imageSrc: '', price: 1, 
        plot: ''
    }}); 


const category = watch('category'); 
const pageCount = watch('pageCount'); 
const imageSrc = watch('imageSrc'); 

        const setCustomValue = (id: string, value: any) => {
            setValue(id, value, {
                shouldDirty: true, shouldTouch: true, shouldValidate: true,
            })
        }
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext(); 
        }
        setIsLoading(true); 
        axios.post('/api/books', data).then(() => {
            toast.success('Book created!');
        router.refresh(); 
        reset(); 
        setStep(STEPS.CATEGORY); 
        loanModal.onClose();
        }).catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false); 
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create"; 
        }
        return "Next";
    }, [step]); 
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined; 
        }
        return "Back"; 
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these genres best describes the book?"
            subtitle="Pick a category" /> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[50vh]
            overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} 
                        selected={category === item.label} label={item.label} icon={item.icon}/> 
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.DETAILS) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Details of book" subtitle="What is the name of the book and author?"/> 
                <Input id="title" label="Name of book" required register={register} errors={errors} /> 
                <Input id="author" label="Author of book" required register={register} errors={errors}/> 
                <Input id="publisher" label="Publisher of book" register={register} errors={errors}/> 
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Info about book" subtitle="More information on book"/> 
                <Input id="format" label="Format of book" required register={register} errors={errors} /> 
                <Input id="audience" label="Audience of book" required register={register} errors={errors}/> 
                <Counter title="Length of book" subtitle="How many pages does your book have?" value={pageCount} onChange={(value) => setCustomValue('pageCount', value)} /> 
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo of your book" subtitle="What does your book look like?" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        )
    }

    if (step === STEPS.PLOT) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe the plot?" 
                subtitle="Give a short summary of what the book is about!" /> 
                <Input id="plot" label="Plot" disabled={isLoading} 
                register={register} errors={errors} required/>
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Price of renting book" subtitle="How much
                do you charge per day of renting the book?" />
                <Input id="price" label="Price" formatPrice type="number"
                disabled={isLoading} register={register} errors={errors} required  /> 
            </div>
        )
    }



    return (
        <Modal title="Add your book" isOpen={loanModal.isOpen} 
        onClose={loanModal.onClose} onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack } body={bodyContent}/>
    )
}

 
export default LoanModal;