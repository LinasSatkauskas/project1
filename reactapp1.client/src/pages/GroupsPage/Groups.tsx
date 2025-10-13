    import { useEffect, useState } from "react";
import { IGroup } from "../../interfaces/IGroup";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { GroupForm } from "./components/GroupForm";

export default function Groups() {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [editGroup, setEditGroup] = useState<IGroup | undefined>();

    const getGroups = () =>
        getApi<IGroup[]>("groups").then((g) => g && setGroups(g));

    const storeGroup = (group: IGroup) => {
        setVisibleModal(false);

        if (group.id) {
            putApi(`groups/${group.id}`, group).then(() => getGroups());
        } else {
            postApi("groups", group).then(() => getGroups());
        }
    };

    const deleteGroup = (id: number | undefined) => {
        if (!id) return;
        setVisibleModal(false);
        deleteApi(`groups/${id}`, {}).then(() => getGroups());
    };

    const editHandler = (group: IGroup) => {
        setEditGroup(group);
        setVisibleModal(true);
    };

    const addHandler = () => {
        setEditGroup(undefined);
        setVisibleModal(true);
    };

    useEffect(() => {
        getGroups();
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    title="Group Form"
                >
                    <GroupForm
                        storeGroup={storeGroup}
                        group={editGroup}
                        deleteGroup={deleteGroup}
                    />
                </Modal>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl">Groups</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addHandler}
                >
                    Add Group
                </button>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Course</th>
                        <th className="border px-4 py-2 text-left">Year</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.id} className="border-b">
                            <td className="border px-4 py-2">{group.name}</td>
                            <td className="border px-4 py-2">{group.course ?? "-"}</td>
                            <td className="border px-4 py-2">{group.year ?? "-"}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="underline text-blue-600"
                                    onClick={() => editHandler(group)}
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