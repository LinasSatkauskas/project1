import { Link, Outlet, useFetchers, useNavigation } from "react-router-dom";

export function Layout() {
    const navigation = useNavigation();
    const fetchers = useFetchers();
    const fetcherInProgress = fetchers.some((f) =>
        ["Loading", "submitting"].includes(f.state)
    );

    return <div className='container mx-auto flex flex-col fap-y-2'>
        <header className='bg-amber-700 text-white p-1'>
            <div className='text-3x1'>GRADEBOOK</div>
            <nav>
                <ul className='flex gap-x-2'>
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/students">Students</Link>
                    </li>
                    <li>
                        <Link to="/programmes">Study Programmes</Link>
                    </li>
                    <li>
                        <Link to="/lecturers">Lecturers</Link>
                    </li>
                    <li>
                        <Link to="/groups">Groups</Link>
                    </li>
                    <li>
                        <Link to="/subjects">Subjects</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <div>
            {navigation.state !== "idle" && <div className="m-1">Navigaion in progress...</div>}
            {fetcherInProgress && <div className="m-1"> Fetcher in progress...</div>}
        </div>
        <Outlet />

        <footer className='bg-gray-500 text-white-sm flex content-center justify-center items-center h-10'>
            <div>Panevėžio kolegija</div>
        </footer>
    </div>
}