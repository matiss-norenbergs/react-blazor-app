import React from 'react'
import ReactDOM from 'react-dom/client'
import { invoke } from '@tauri-apps/api/tauri'

import App from 'core/App'

import './index.css'

document.addEventListener('DOMContentLoaded', () => {
    invoke('close_splashscreen')
        .then(response => {
            console.log("RES", response)
        })
        .catch(error => {
            console.log("ERROR", error)
        })
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)