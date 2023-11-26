import PropTypes from "prop-types"
import classNames from "classnames"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useCallback, useState } from 'react'

import { defaultTheme, localStorageConstants } from "helpers/constants"

import ThemeContext from "../themeContext"
import Header from "../header"
import Footer from "../footer"

import styles from "./CoreView.module.css"

const propTypes = {
    routes: PropTypes.array,
    logo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    hideFooter: PropTypes.bool,
    extraHeaderContent: PropTypes.node,
    allowToggleFullscreen: PropTypes.bool
}
const defaultProps = {
    routes: []
}

const CoreView = ({
    routes,
    logo: headerLogo,
    hideFooter,
    extraHeaderContent,
    allowToggleFullscreen
}) => {

    const [theme, setTheme] = useState(localStorage.getItem(localStorageConstants.theme) || defaultTheme)
    const [useSideNavigation, setUseSideNavigation] = useState(true)

    const setActiveTheme = useCallback((newTheme) => {
        localStorage.setItem(localStorageConstants.theme, newTheme)
        setTheme(newTheme)
    }, [])

    const setActiveNavPostion = useCallback(() => {
        setUseSideNavigation(prevState => !prevState)
    }, [])

    const headerPaths = routes.filter(({ menuHidden }) => !menuHidden).map(({ path, title, icon }) => ({
        path,
        title,
        icon
    }))

    return (
        <ThemeContext.Provider value={{
            theme,
            setActiveTheme,
            useSideNavigation,
            setActiveNavPostion
        }}>
            <div className={classNames(
                styles["core-view-wrapper"],
                styles[theme],
            )}>
                <Router>
                    <Header
                        paths={headerPaths}
                        logo={headerLogo}
                        extraContent={extraHeaderContent}
                        useSideNavigation={useSideNavigation}
                        allowToggleFullscreen={allowToggleFullscreen}
                    />
                    <div className={classNames(
                        styles["core-content"],
                        {
                            [styles["use-side-navigation"]]: useSideNavigation
                        }
                    )}>
                        <Routes>
                            { routes.map(({ path, element: Element }) => (
                                <Route
                                    key={path}
                                    exact={path === "/"}
                                    path={path}
                                    element={<Element />}
                                />
                            ))}
                        </Routes>
                        {!hideFooter && (
                            <Footer />
                        )}
                    </div>
                </Router>
            </div>
        </ThemeContext.Provider>
    )
}
CoreView.propTypes = propTypes
CoreView.defaultProps = defaultProps

export default CoreView