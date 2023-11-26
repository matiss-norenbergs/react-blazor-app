import mnIcon from "assets/images/mnIcon.svg"

import CoreView from "components/coreView"

import Home from "pages/home"
import Components from "pages/components"
import Calculator from "pages/calculator"
// eslint-disable-next-line
import styles from "./App.module.css"

const apps = [
    {
        path: "/",
        title: "Home",
        icon: "",
        menuHidden: false,
        element: Home
    },
    {
        path: "/components",
        title: "Components",
        icon: "",
        menuHidden: false,
        element: Components
    },
    {
        path: "/calculator",
        title: "Calculator",
        icon: "",
        menuHidden: false,
        element: Calculator
    }
]

function App() {
    return (
        <CoreView
            logo={mnIcon}
            routes={apps}
            hideFooter
            //allowToggleFullscreen
        />
    )
}

export default App