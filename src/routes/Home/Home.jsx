//REACT
import { Outlet } from "react-router-dom"

//COMPONENTS
import Directory from "../../components/directory/Directory"


function Home() {
    return (
        <>
            <Directory />
            <Outlet />
        </>
    )
}

export default Home