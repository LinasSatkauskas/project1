import { useState, useEffect } from "react";
import { IProgramme } from "../../../interfaces/IProgrammes";
import { ISubject } from "../../../interfaces/ISubject";
import { getApi } from "../../../api";

interface Props {
    storeProgramme: (p: IProgramme) => void;
    programme?: IProgramme;
    deleteProgramme: (id?: number) => void;
}

export function ProgrammeForm({ storeProgramme, programme, deleteProgramme }: Props) {
    const [name, setName] = useState<string>("");
    const [durationYears, setDurationYears] = useState<number | undefined>(undefined);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        getApi<ISubject[]>("subjects").then(s => s && setSubjects(s));
    }, []);

    useEffect(() => {
        if (programme) {
            setName(programme.name);
            setDurationYears(programme.durationYears);
            setSelectedIds(programme.subjectIds ? [...programme.subjectIds] : []);
        } else {
            setName("");
            setDurationYears(undefined);
            setSelectedIds([]);
        }
    }, [programme]);

    const toggleSubject = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        storeProgramme({ id: programme?.id, name, durationYears, subjectIds: selectedIds });
    };

    const remove = () => {
        deleteProgramme(programme?.id);
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-y-2">
            <label className="flex flex-col">
                <span>Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="border p-1" />
            </label>

            <label className="flex flex-col">
                <span>Duration (years)</span>
                <input
                    type="number"
                    value={durationYears ?? ""}
                    onChange={(e) => setDurationYears(e.target.value ? parseInt(e.target.value) : undefined)}
                    className="border p-1"
                />
            </label>

            <fieldset>
                <legend>Subjects</legend>
                <div className="flex flex-col">
                    {subjects.map(s => (
                        <label key={s.id} className="inline-flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(s.id!)}
                                onChange={() => toggleSubject(s.id!)}
                            />
                            <span>{s.name}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="flex gap-x-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
                {programme?.id && (
                    <button type="button" onClick={remove} className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}