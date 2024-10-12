"use client"; 
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calendar from "../../inputs/Calendar";
import Heading from "../../Heading";
import Counter from "../../inputs/Counter";
import Input from "../../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";


enum STEPS {
    AUTHOR = 0, 
    DATE = 1,
    INFO = 2
}
const SearchModal = () => {
    const {register, formState: {errors}, watch} = useForm<FieldValues>({defaultValues: {
        category: '', author: '', name: '', publisher: '', format: '', audience: '',  pageCount: 0, imageSrc: '', price: 1, 
        plot: ''
    }}); 
    const searchModal = useSearchModal(); 
    const params = useSearchParams(); 
    const router = useRouter(); 
    const [step, setStep] = useState(STEPS.AUTHOR); 
    const [pageCount, setPageCount] = useState(0);      
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(), endDate: new Date(), key: 'selection'
    });
    const onBack = useCallback(() => {
        setStep((value) => value - 1); 
    }, []);
    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []); 
    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext(); 
        }
        let currentQuery = {}; 
        if (params) {
            currentQuery = qs.parse(params.toString()); 
        }
        const updatedQuery: any = {
            ...currentQuery,
            pageCount,
            author: watch('author'), // Add form values using react-hook-form's `watch` function
        title: watch('title'),
        publisher: watch('publisher'),
        format: watch('format'),
        audience: watch('audience'),
        }; 
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate); 
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate); 
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true}); 
        setStep(STEPS.AUTHOR); 
        searchModal.onClose();
        router.push(url);
    }, [step, searchModal, location, router, pageCount,
        dateRange, onNext, params
    ])
    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'; 
        }
        return 'Next'; 
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.AUTHOR) {
            return undefined; 
        }
        return 'Back'; 
    }, [step]); 
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Who is the author?" subtitle="Find the author!" />
                <Input id="title" label="Name of book" required register={register} errors={errors} /> 
                <Input id="author" label="Author of book" required register={register} errors={errors}/> 
                <Input id="publisher" label="Publisher of book" register={register} errors={errors}/> 
        </div>
    )
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When do you plan to reserve?"
                subtitle="Make sure the book is available!" /> 
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} /> 
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More information" subtitle="Find your perfect place!" /> 
                <Counter title="Guests" subtitle="How many pages would you like?"
                value={pageCount} onChange={(value) => setPageCount(value)}/> 
                <Input id="format" label="Format of book" required register={register} errors={errors} /> 
                <Input id="audience" label="Audience of book" required register={register} errors={errors}/> 
            </div>
        )
    }
    
    return (
        <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose}
        onSubmit={onSubmit} title="Filters" actionLabel={actionLabel}
        body={bodyContent} secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.AUTHOR ? undefined : onBack}/>
    )
}
export default SearchModal; 