import { useEffect, useState } from "react";
import { IProgramme } from "../../interfaces/IProgrammes";
import { ISubject } from "../../interfaces/ISubject";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { ProgrammeForm } from "./components/ProgrammeForm";

export default function Programmes() {
    const [programmes, setProgrammes] = useState<IProgramme[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [editProgramme, setEditProgramme] = useState<IProgramme | undefined>();

    // For subject description modal
    const [descModalOpen, setDescModalOpen] = useState(false);
    const [descModalSubject, setDescModalSubject] = useState<ISubject | undefined>();

    // Fetch all programmes
    const getProgrammes = () =>
        getApi<IProgramme[]>("programmes").then((p) => p && setProgrammes(p));

    // Fetch all subjects (for display)
    const getSubjects = () =>
        getApi<ISubject[]>("subjects").then((s) => s && setSubjects(s));

    const storeProgramme = (programme: IProgramme) => {
        setVisibleModal(false);

        if (programme.id) {
            putApi(`programmes/${programme.id}`, programme).then(() => getProgrammes());
        } else {
            postApi("programmes", programme).then(() => getProgrammes());
        }
    };

    const deleteProgramme = (id: number | undefined) => {
        if (!id) return;
        setVisibleModal(false);
        deleteApi(`programmes/${id}`, {}).then(() => getProgrammes());
    };

    const editHandler = (programme: IProgramme) => {
        setEditProgramme(programme);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditProgramme(undefined);
        setVisibleModal(true);
    };

    useEffect(() => {
        getProgrammes();
        getSubjects();
    }, []);

    // Helper to get subject objects for a programme
    const getSubjectObjects = (subjectIds?: number[]) => {
        if (!subjectIds || subjectIds.length === 0) return [];
        return subjects.filter(s => subjectIds.includes(s.id!));
    };

    // Show subject description modal
    const showSubjectDescription = (subject: ISubject) => {
        setDescModalSubject(subject);
        setDescModalOpen(true);
    };

    return (
        <div>
            {visibleModal && (
                <Modal
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    title="Programme Form"
                >
                    <ProgrammeForm
                        storeProgramme={storeProgramme}
                        programme={editProgramme}
                        deleteProgramme={deleteProgramme}
                    />
                </Modal>
            )}

            {descModalOpen && descModalSubject && (
                <Modal
                    visibleModal={descModalOpen}
                    setVisibleModal={setDescModalOpen}
                    title={descModalSubject.name}
                >
                    <div>
                        <div><strong>Description:</strong></div>
                        <div>{descModalSubject.description}</div>
                    </div>
                </Modal>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl">Study Programmes</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addHandler}
                >
                    Add Programme
                </button>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Programme</th>
                        <th className="border px-4 py-2 text-left">Duration (years)</th>
                        <th className="border px-4 py-2 text-left">Subjects</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {programmes.map((programme) => (
                        <tr key={programme.id} className="border-b">
                            <td className="border px-4 py-2">{programme.name}</td>
                            <td className="border px-4 py-2">{programme.durationYears ?? "-"}</td>
                            <td className="border px-4 py-2">
                                {getSubjectObjects(programme.subjectIds).length === 0
                                    ? "-"
                                    : getSubjectObjects(programme.subjectIds).map((subject, idx) => (
                                        <span key={subject.id}>
                                            <button
                                                type="button"
                                                className="underline text-blue-600"
                                                onClick={() => showSubjectDescription(subject)}
                                            >
                                                {subject.name}
                                            </button>
                                            {idx < getSubjectObjects(programme.subjectIds).length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="underline text-blue-600"
                                    onClick={() => editHandler(programme)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}