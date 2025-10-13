import { useEffect, useState } from "react";
import { ILecturer } from "../../interfaces/ILecturer";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { LecturerForm } from "./components/LecturerForm";

export default function Lecturers() {
    const [lecturers, setLecturers] = useState<ILecturer[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [editLecturer, setEditLecturer] = useState<ILecturer | undefined>();

    const getLecturers = () =>
        getApi<ILecturer[]>("lecturers").then((s) => s && setLecturers(s));

    const storeLecturer = (lecturer: ILecturer) => {
        setVisibleModal(false);

        if (lecturer.id) {
            putApi(`lecturers/${lecturer.id}`, lecturer).then(() => getLecturers());
        } else {
            postApi("lecturers", lecturer).then(() => getLecturers());
        }
    };

    const deleteLecturer = (id: number | undefined) => {
        if (!id) return;
        setVisibleModal(false);
        deleteApi(`lecturers/${id}`, {}).then(() => getLecturers());
    };

    const editHandler = (lecturer: ILecturer) => {
        setEditLecturer(lecturer);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditLecturer(undefined);
        setVisibleModal(true);
    };

    useEffect(() => {
        getLecturers();
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    title="Lecturer Form"
                >
                    <LecturerForm
                        storeLecturer={storeLecturer}
                        lecturer={editLecturer}
                        deleteLecturer={deleteLecturer}
                    />
                </Modal>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl">Lecturers</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addHandler}
                >
                    Add Lecturer
                </button>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">First Name</th>
                        <th className="border px-4 py-2 text-left">Last Name</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {lecturers.map((lecturer) => (
                        <tr key={lecturer.id} className="border-b">
                            <td className="border px-4 py-2">{lecturer.firstName}</td>
                            <td className="border px-4 py-2">{lecturer.lastName}</td>
                            <td className="border px-4 py-2">{lecturer.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="underline text-blue-600"
                                    onClick={() => editHandler(lecturer)}
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
