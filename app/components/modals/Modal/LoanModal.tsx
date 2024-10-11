"use client";
import useLoanModal from "@/app/hooks/useLoanModal";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { categories } from "../../navbar/Categories";
import Modal from "./Modal";
import Heading from "../../Heading";
import CategoryInput from "../../inputs/CategoryInput";
import Input from "../../inputs/Input";

 

enum STEPS {
    CATEGORY=0,
    DETAILS=1, 
    INFO=2, 
    IMAGES=3, 
    PLOT=4, 
    PRICE=5
}
const LoanModal = () => {
    const loanModal = useLoanModal(); 
    const [step, setStep] = useState(STEPS.CATEGORY); 

    const {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm<FieldValues>({defaultValues: {
        category: '', author: '', name: '', publisher: '', format: '', audience: '',  pagesCount: 1, imageSrc: '', price: 1, 
        plot: ''
    }}); 


const category = watch('category'); 

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
                <Input id="name" label="Name of book" required register={register} errors={errors} /> 
                <Input id="author" label="Author of book" required register={register} errors={errors}/> 
                <Input id="publisher" label="Publisher of book" register={register} errors={errors}/> 
            </div>
        )
    }



    return (
        <Modal title="Add your book" isOpen={loanModal.isOpen} 
        onClose={loanModal.onClose} onSubmit={onNext}
        actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack } body={bodyContent}/>
    )
}

 
export default LoanModal;