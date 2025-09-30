import { useForm } from "react-hook-form"
import { IStudent } from "../../../interfaces/IStudent";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type StudentFormProps = { student: IStudent | undefined; storeStudent: (data: IStudent) => void }

export function StudentForm({ student, storeStudent }: StudentFormProps) {
    const { register, handleSubmit, reset } = useForm<IStudent>({
        defaultValues: {
            id: undefined,
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    useEffect(() => {
        if (student) reset(student); // only reset if editing
    }, [student, reset]);

    return (
        <form onSubmit={handleSubmit(storeStudent)} className='flex flex-col gap-3'>
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="firstName" className={formStyle.label}>Vardas</label>
                <input id="firstName" className={formStyle.input} {...register("firstName", { required: true, maxLength: 30 })} />
            </div>
            <div>
                <label htmlFor="lastName" className={formStyle.label}>Pavardė</label>
                <input id="lastName" className={formStyle.input} {...register("lastName", { required: true, maxLength: 30 })} />
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>Paštas</label>
                <input id="email" className={formStyle.input} {...register("email", { required: true, maxLength: 40 })} />
            </div>
            <button className={formStyle.button} type="submit">Atnaujinti</button>
        </form>
    )
}
