import { useForm } from "react-hook-form"
import { ILecturer } from "../../../interfaces/ILecturer";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type LecturerFormProps = {
    lecturer: ILecturer | undefined;
    storeLecturer: (data: ILecturer) => void
}


export function LecturerForm({ lecturer, storeLecturer }: LecturerFormProps) {
    const { register, handleSubmit, reset } = useForm<ILecturer>({
        defaultValues: {
            id: undefined,
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    useEffect(() => {
        if (lecturer) reset(lecturer); // only reset if editing
    }, [lecturer, reset]);

    return (
        <form
            onSubmit={handleSubmit((data, e) => {
                const submitter = (e?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

                // Clear id if creating a new student
                if (submitter?.value === "new") {
                    data.id = undefined;
                }

                storeLecturer(data);

                if (submitter?.value === "new") {
                    reset({
                        id: undefined,
                        firstName: "",
                        lastName: "",
                        email: "",
                    });
                }
            })}


            className='flex flex-col gap-3'
        >
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="firstName" className={formStyle.label}>Vardas</label>
                <input
                    id="firstName"
                    className={formStyle.input}
                    {...register("firstName", { required: true, maxLength: 30 })}
                />
            </div>
            <div>
                <label htmlFor="lastName" className={formStyle.label}>Pavardė</label>
                <input
                    id="lastName"
                    className={formStyle.input}
                    {...register("lastName", { required: true, maxLength: 30 })}
                />
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>Paštas</label>
                <input
                    id="email"
                    className={formStyle.input}
                    {...register("email", { required: true, maxLength: 40 })}
                />
            </div>
            <button className={formStyle.button} type="submit" value="update">Atnaujinti</button>
            <button className={formStyle.button} type="submit" value="new">Pridėti naują</button>
            <button className={formStyle.button} type="submit" value="new">Ištrinti</button>
        </form>
    )
}
