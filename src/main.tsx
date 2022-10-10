// import React from "react";
// import ReactDOM from "react-dom";
// import "./global.scss";
// import Layout from "./Layout";

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <BrowserRouter>
//     <Layout />
//   </BrowserRouter>
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Layout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)