import {
    createBrowserRouter,
    RouterProvider,
}
    from "react-router-dom";
import Home from "./pages/HomePage/Home";
import { Layout } from "./pages/Layout";
import Students from "./pages/StudentsPage/Students";

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
        }
            ]
        },

        ]);

return <RouterProvider router={router} />;

}