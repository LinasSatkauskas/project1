import {
    createBrowserRouter,
    RouterProvider,
}
    from "react-router-dom";
import Home from "./pages/HomePage/Home";
import { Layout } from "./pages/Layout";
import Students from "./pages/StudentsPage/Students";
import Lecturers from "./pages/LecturersPage/Lecturers";
import Subjects from "./pages/SubjectsPage/Subjects";
import Groups from "./pages/GroupsPage/Groups";
import Programme from "./pages/ProgrammesPage/Programmes";
import path from "node:path/win32";

export default function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [

                {
                    index: true, Component: Home
                },
                {
            path: "students",
            Component: Students
                },
                {
                path: "lecturers",
                Component: Lecturers
                },
                {
                    path: "subjects",
                    Component: Subjects
                },
                {
                    path: "groups",
                    Component: Groups
                },
                {
                    path: "programmes",
                    Component: Programme
                }

            ]
        },

        ]);

return <RouterProvider router={router} />;

}