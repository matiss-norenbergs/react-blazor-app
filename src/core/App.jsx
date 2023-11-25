import mnIcon from "assets/images/mnIcon.svg"

import CoreView from "components/coreView"

import Home from "pages/home"
import Calculator from "pages/calculator"

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
            useSideNavigation
        />
    )
}

export default App