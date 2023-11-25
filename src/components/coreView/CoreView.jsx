import PropTypes from "prop-types"
import classNames from "classnames"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useCallback, useState } from 'react'

import { defaultTheme, localStorageConstants } from "helpers/constants"

import { ThemeContext } from "components/themeContext/ThemeContext"

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
    useSideNavigation: PropTypes.bool
}
const defaultProps = {
    routes: [],
    useSideNavigation: false
}

const CoreView = ({
    routes,
    logo: headerLogo,
    hideFooter,
    extraHeaderContent,
    useSideNavigation
}) => {

    const [theme, setTheme] = useState(localStorage.getItem(localStorageConstants.theme) || defaultTheme)

    const setActiveTheme = useCallback((newTheme) => {
        localStorage.setItem(localStorageConstants.theme, newTheme)
        setTheme(newTheme)
    }, [])

    const headerPaths = routes.filter(({ menuHidden }) => !menuHidden).map(({ path, title, icon }) => ({
        path,
        title,
        icon
    }))

    return (
        <ThemeContext.Provider value={{ theme, setActiveTheme }}>
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