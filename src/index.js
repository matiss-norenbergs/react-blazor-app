import React from 'react'
import ReactDOM from 'react-dom/client'
// import { invoke } from '@tauri-apps/api/tauri'

import App from 'core/App'

import './index.css'

// document.addEventListener('DOMContentLoaded', () => {
//     invoke('close_splashscreen')
//         .then(() => null)
//         .catch(() => null)
// })

// {
//     "url": "splashscreen.html",
//     "label": "splashscreen",
//     "center": true,
//     "decorations": false,
//     "resizable": false,
//     "width": 600,
//     "height": 400
//   }

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)