import { useEffect, useState } from "react";
import { ILecturer } from "../../interfaces/ILecturer";
import { getApi, postApi, putApi } from "../../api"; // make sure postApi exists
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
            // Update existing lecturer
            putApi(`lecturers/${lecturer.id}`, lecturer).then(() => getLecturers());
        } else {
            // Create new lecturer
            postApi("lecturers", lecturer).then(() => getLecturers());
        }
    };

    const editHandler = (lecturer: ILecturer) => {
        setEditLecturer(lecturer);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditLecturer(undefined); // clear previous student
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
                    title="Dėstytojų forma"
                >
                    <LecturerForm storeLecturer={storeLecturer} lecturer={editLecturer} />
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

            <div>
                {lecturers.map((lecturer) => (
                    <div key={lecturer.id} className="mb-2">
                        <button
                            type="button"
                            className="underline text-blue-600 mr-2"
                            onClick={() => editHandler(lecturer)}
                        >
                            {lecturer.firstName} {lecturer.lastName}
                        </button>
                        {lecturer.email}
                    </div>
                ))}
            </div>
        </div>
    );
}
