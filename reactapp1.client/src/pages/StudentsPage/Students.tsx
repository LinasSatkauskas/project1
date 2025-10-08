import { useEffect, useState } from "react";
import { IStudent } from "../../interfaces/IStudent";
import { getApi, postApi, putApi } from "../../api"; // make sure postApi exists
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
            // Update existing student
            putApi(`students/${student.id}`, student).then(() => getStudents());
        } else {
            // Create new student
            postApi("students", student).then(() => getStudents());
        }
    };

    const editHandler = (student: IStudent) => {
        setEditStudent(student);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditStudent(undefined); // clear previous student
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
                    title="Studentų forma"
                >
                    <StudentForm storeStudent={storeStudent} student={editStudent} />
                </Modal>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl">Students</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addHandler}
                >
                    Change Student
                </button>
            </div>

            <div>
                {students.map((student) => (
                    <div key={student.id} className="mb-2">
                        <button
                            type="button"
                            className="underline text-blue-600 mr-2"
                            onClick={() => editHandler(student)}
                        >
                            {student.firstName} {student.lastName}
                        </button>
                        {student.email}
                    </div>
                ))}
            </div>
        </div>
    );
}
