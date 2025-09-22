import { useEffect, useState } from 'react';
import { IStudent } from "../../interfaces/IStudent";
import { getApi } from "../../api"; }

export default function Students() {
    const [students, setStudents] = useState<IStudent[]>([]);

    useEffect(() => {
        getApi<Student[]>('students').then(s => setStudents(s));)

}, []);
return <div>
    <div className="text-3xl">Students</div>
    <div>{
        students.map(s => <div key={student.id}>{student.fullName} {student.email}</div>)
    }</div>
</div>
}