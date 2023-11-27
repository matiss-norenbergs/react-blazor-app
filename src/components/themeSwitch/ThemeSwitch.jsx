import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useContext, useEffect } from "react"

import { localStorageConstants, themes } from "helpers/constants"
import useThemeDetector from "hooks/useThemeDetector"

import ThemeContext from "../themeContext"
import FaIcon from "../faIcon"

import styles from "./ThemeSwitch.module.css"

const propTypes = {
    className: PropTypes.string,
    useThemeSelector: PropTypes.bool,
    useSideNavigation: PropTypes.bool
}

const ThemeSelect = ({
    className,
    useThemeSelector,
    useSideNavigation
}) => {
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

    const onThemeOptionClick = useCallback((selectedTheme) => () => {
        switch (selectedTheme) {
            case themes.light:
            case themes.dark:
                setActiveTheme(selectedTheme)
                break
            default:
                setActiveTheme(themes.light)
                break
        }
    }, [setActiveTheme])

    useEffect(() => {
        if (!localStorageConstants.theme && isBrowserInDarkMode) {
            setActiveTheme(themes.dark)
        }
    }, [isBrowserInDarkMode, setActiveTheme])

    const themeOptionStyles = classNames(
        className,
        styles["theme-option"]
    )

    if (useThemeSelector) {
        return (
            <div className={classNames(
                styles["theme-dropdown"],
                styles[theme],
                {
                    [styles["use-top-navigation"]]: !useSideNavigation
                }
            )}>
                <span
                    className={classNames(
                        className,
                        styles["theme-dropdown-target"]
                    )}
                >
                    <FaIcon
                        icon="fill-drip"
                        fixedWidth
                    />
                </span>
                <div className={styles["theme-dropdown-content"]}>
                    <div className={styles["theme-setting-content"]}>
                        <span
                            className={themeOptionStyles}
                            onClick={onThemeOptionClick("theme-settings")}
                        >
                            <FaIcon
                                icon="cog"
                                fixedWidth
                            />
                        </span>
                        <div className={styles["theme-setting-label"]}>
                            Modify theme
                        </div>
                    </div>
                    <div className={styles["theme-setting-content"]}>
                        <span
                            className={themeOptionStyles}
                            onClick={onThemeOptionClick(themes.light)}
                        >
                            <FaIcon
                                icon="sun"
                                fixedWidth
                            />
                        </span>
                        <div className={styles["theme-setting-label"]}>
                            Light theme
                        </div>
                    </div>
                    <div className={styles["theme-setting-content"]}>
                        <span
                            className={themeOptionStyles}
                            onClick={onThemeOptionClick(themes.dark)}
                        >
                            <FaIcon
                                icon="moon"
                                fixedWidth
                            />
                        </span>
                        <div className={styles["theme-setting-label"]}>
                            Dark theme
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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