import classNames from "classnames"
import { useCallback, useContext, useEffect } from "react"

import { ThemeContext } from "components/themeContext/ThemeContext"
import { localStorageConstants, themes } from "helpers/constants"
import useThemeDetector from "hooks/useThemeDetector"

import FaIcon from "../faIcon"

import styles from "./ThemeSelect.module.css"

const ThemeSelect = () => {

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
            className={classNames(
                styles["theme-wrapper"],
                styles[theme]
            )}
            onClick={onThemeChange}
        >
            <FaIcon
                icon={["far", theme === themes.light ? "moon" : "sun"]}
                fixedWidth
            />
        </span>
    )
}

export default ThemeSelect