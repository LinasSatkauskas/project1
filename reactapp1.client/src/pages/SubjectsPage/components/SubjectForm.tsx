import { useForm } from "react-hook-form"
import { ISubject } from "../../../interfaces/ISubject";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type SubjectFormProps = {
    subject: ISubject | undefined;
    storeSubject: (data: ISubject) => void;
    deleteSubject?: (id: number | undefined) => void;
}

export function SubjectForm({ subject, storeSubject, deleteSubject }: SubjectFormProps) {
    const { register, handleSubmit, reset, getValues } = useForm<ISubject>({
        defaultValues: {
            id: undefined,
            name: "",
            code: "",
            description: "",
        },
    });

    useEffect(() => {
        if (subject) reset(subject);
    }, [subject, reset]);

    return (
        <form
            onSubmit={handleSubmit((data, e) => {
                const submitter = (e?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

                if (submitter?.value === "delete") {
                    if (deleteSubject) {
                        deleteSubject(data.id);
                    }
                    reset({
                        id: undefined,
                        name: "",
                        code: "",
                        description: "",
                    });
                    return;
                }

                if (submitter?.value === "new") {
                    data.id = undefined;
                }

                storeSubject(data);

                if (submitter?.value === "new") {
                    reset({
                        id: undefined,
                        name: "",
                        code: "",
                        description: "",
                    });
                }
            })}
            className='flex flex-col gap-3'
        >
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="name" className={formStyle.label}>Pavadinimas</label>
                <input
                    id="name"
                    className={formStyle.input}
                    {...register("name", { required: true, maxLength: 50 })}
                />
            </div>
            <div>
                <label htmlFor="code" className={formStyle.label}>Kodas</label>
                <input
                    id="code"
                    className={formStyle.input}
                    {...register("code", { required: true, maxLength: 20 })}
                />
            </div>
            <div>
                <label htmlFor="description" className={formStyle.label}>Aprašymas</label>
                <input
                    id="description"
                    className={formStyle.input}
                    {...register("description", { required: true, maxLength: 200 })}
                />
            </div>
            <button className={formStyle.button} type="submit" value="update">Atnaujinti</button>
            <button className={formStyle.button} type="submit" value="new">Pridėti naują</button>
            <button className={formStyle.button} type="submit" value="delete">Pašalinti</button>
        </form>
    )
}