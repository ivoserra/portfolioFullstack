import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";

import App from './App.jsx'
import DataContextProvider from "./components/Context/DataContext.jsx";
import UserContextProvider  from "./components/Context/UserContext.jsx";


ReactDOM.render(
<HashRouter>
<DataContextProvider>
<UserContextProvider>
    <App/>
</UserContextProvider>
</DataContextProvider>
 

</HashRouter>, document.querySelector('#root'))