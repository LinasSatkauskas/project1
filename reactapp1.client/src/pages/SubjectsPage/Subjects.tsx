import { useEffect, useState } from "react";
import { ISubject } from "../../interfaces/ISubject";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { SubjectForm } from "./components/SubjectForm";

export default function Subjects() {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [editSubject, setEditSubject] = useState<ISubject | undefined>();

    const getSubjects = () =>
        getApi<ISubject[]>("subjects").then((s) => s && setSubjects(s));

    const storeSubject = (subject: ISubject) => {
        setVisibleModal(false);

        if (subject.id) {
            putApi(`subjects/${subject.id}`, subject).then(() => getSubjects());
        } else {
            postApi("subjects", subject).then(() => getSubjects());
        }
    };

    const deleteSubject = (id: number | undefined) => {
        if (!id) return;
        setVisibleModal(false);
        deleteApi(`subjects/${id}`, {}).then(() => getSubjects());
    };

    const editHandler = (subject: ISubject) => {
        setEditSubject(subject);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditSubject(undefined);
        setVisibleModal(true);
    };

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    title="Subject Form"
                >
                    <SubjectForm
                        storeSubject={storeSubject}
                        subject={editSubject}
                        deleteSubject={deleteSubject}
                    />
                </Modal>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl">Subjects</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addHandler}
                >
                    Add Subject
                </button>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Code</th>
                        <th className="border px-4 py-2 text-left">Description</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id} className="border-b">
                            <td className="border px-4 py-2">{subject.name}</td>
                            <td className="border px-4 py-2">{subject.code}</td>
                            <td className="border px-4 py-2">{subject.description}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="underline text-blue-600"
                                    onClick={() => editHandler(subject)}
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