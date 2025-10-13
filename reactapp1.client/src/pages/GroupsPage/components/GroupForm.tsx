import { useForm } from "react-hook-form";
import { IGroup } from "../../../interfaces/IGroup";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type GroupFormProps = {
    group: IGroup | undefined;
    storeGroup: (data: IGroup) => void;
    deleteGroup?: (id: number | undefined) => void;
}

export function GroupForm({ group, storeGroup, deleteGroup }: GroupFormProps) {
    const { register, handleSubmit, reset } = useForm<IGroup>({
        defaultValues: {
            id: undefined,
            name: "",
            course: "",
            year: undefined,
        },
    });

    useEffect(() => {
        if (group) reset(group);
    }, [group, reset]);

    return (
        <form
            onSubmit={handleSubmit((data, e) => {
                const submitter = (e?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

                if (submitter?.value === "delete") {
                    if (deleteGroup) {
                        deleteGroup(data.id);
                    }
                    reset({
                        id: undefined,
                        name: "",
                        course: "",
                        year: undefined,
                    });
                    return;
                }

                if (submitter?.value === "new") {
                    data.id = undefined;
                }

                storeGroup(data);

                if (submitter?.value === "new") {
                    reset({
                        id: undefined,
                        name: "",
                        course: "",
                        year: undefined,
                    });
                }
            })}
            className='flex flex-col gap-3'
        >
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="name" className={formStyle.label}>Group Name</label>
                <input
                    id="name"
                    className={formStyle.input}
                    {...register("name", { required: true, maxLength: 30 })}
                />
            </div>
            <div>
                <label htmlFor="course" className={formStyle.label}>Course</label>
                <input
                    id="course"
                    className={formStyle.input}
                    {...register("course", { maxLength: 30 })}
                />
            </div>
            <div>
                <label htmlFor="year" className={formStyle.label}>Year</label>
                <input
                    id="year"
                    type="number"
                    className={formStyle.input}
                    {...register("year")}
                />
            </div>
            <button className={formStyle.button} type="submit" value="update">Update</button>
            <button className={formStyle.button} type="submit" value="new">Add New</button>
            <button className={formStyle.button} type="submit" value="delete">Delete</button>
        </form>
    )
}

export default GroupForm;