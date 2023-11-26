import PropTypes from "prop-types"
import { useCallback, useContext, useEffect } from "react"

import { localStorageConstants, themes } from "helpers/constants"
import useThemeDetector from "hooks/useThemeDetector"

import ThemeContext from "../themeContext"
import FaIcon from "../faIcon"
// eslint-disable-next-line
import styles from "./ThemeSwitch.module.css"

const propTypes = {
    className: PropTypes.string
}

const ThemeSelect = ({ className }) => {

    const { theme, setActiveTheme } = useContext(ThemeContext)
    const isBrowserInDarkMode = useThemeDetector()

    const onThemeChange = useCallback(() => {
        switch (theme) {
            case themes.dark:
                setActiveTheme(themes.light)
                break
            case themes.light:
                setActiveTheme(themes.dark)
                break
            default:
                setActiveTheme(themes.light)
                break
        }
    }, [theme, setActiveTheme])

    useEffect(() => {
        if (!localStorageConstants.theme && isBrowserInDarkMode) {
            setActiveTheme(themes.dark)
        }
    }, [isBrowserInDarkMode, setActiveTheme])

    return (
        <span
            className={className}
            onClick={onThemeChange}
        >
            <FaIcon
                icon={["far", theme === themes.light ? "moon" : "sun"]}
                fixedWidth
            />
        </span>
    )
}
ThemeSelect.propTypes = propTypes

export default ThemeSelect