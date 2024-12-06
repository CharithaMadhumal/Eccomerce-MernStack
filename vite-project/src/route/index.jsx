import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage.jsx";
import Search from "../components/Search";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",

                element : <SearchPage/>
            },
            {
                path : "",
                element : <Search/>
            }
        ]
    }
])

export default router;