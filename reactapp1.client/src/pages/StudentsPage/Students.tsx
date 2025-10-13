import { useEffect, useState } from "react";
import { IStudent } from "../../interfaces/IStudent";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { StudentForm } from "./components/StudentForm";

export default function Students() {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [editStudent, setEditStudent] = useState<IStudent | undefined>();

    const getStudents = () =>
        getApi<IStudent[]>("students").then((s) => s && setStudents(s));

    const storeStudent = (student: IStudent) => {
        setVisibleModal(false);

        if (student.id) {
            putApi(`students/${student.id}`, student).then(() => getStudents());
        } else {
            postApi("students", student).then(() => getStudents());
        }
    };

    const deleteStudent = (id: number | undefined) => {
        if (!id) return;
        setVisibleModal(false);
        deleteApi(`students/${id}`, {}).then(() => getStudents());
    };

    const editHandler = (student: IStudent) => {
        setEditStudent(student);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditStudent(undefined);
        setVisibleModal(true);
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    title="Student Form"
                >
                    <StudentForm
                        storeStudent={storeStudent}
                        student={editStudent}
                        deleteStudent={deleteStudent}
                    />
                </Modal>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl">Students</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addHandler}
                >
                    Add Student
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
                    {students.map((student) => (
                        <tr key={student.id} className="border-b">
                            <td className="border px-4 py-2">{student.firstName}</td>
                            <td className="border px-4 py-2">{student.lastName}</td>
                            <td className="border px-4 py-2">{student.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="underline text-blue-600"
                                    onClick={() => editHandler(student)}
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
