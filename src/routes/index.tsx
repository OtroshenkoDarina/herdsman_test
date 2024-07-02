import {Routes, Route} from "react-router-dom";
import {pathList} from "./path";
import HomePage from "../templates/HomePage/HomePage";

export default function Routers() {
    return (
        <Routes>
            <Route path={pathList.home} element={<HomePage/>}/>
        </Routes>
    )
}
