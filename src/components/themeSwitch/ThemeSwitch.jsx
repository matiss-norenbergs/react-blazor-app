import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useContext, useEffect, useRef } from "react"

import { localStorageConstants, themes } from "helpers/constants"
import { setStyleProperty } from "helpers/domStyleHelper"
import useThemeDetector from "hooks/useThemeDetector"

import ThemeContext from "../themeContext"
import FaIcon from "../faIcon"
import Modal from "../modal"

import CustomThemeForm from "./components/customThemeForm"

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
    const themeModalElementRef = useRef(null)

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

    const handleThemeModalOpenClick = useCallback(() => {
        themeModalElementRef.current?.open()
    }, [])

    const handleThemeModalSaveClick = useCallback(() => {
        setStyleProperty("--custom-theme-background", localStorage.getItem(localStorageConstants.customTheme.background))
        setStyleProperty("--custom-theme-background-2", localStorage.getItem(localStorageConstants.customTheme.background2))
        setStyleProperty("--custom-theme-color", localStorage.getItem(localStorageConstants.customTheme.color))
        setStyleProperty("--custom-theme-primary", localStorage.getItem(localStorageConstants.customTheme.primary))
        setStyleProperty("--custom-theme-primary-rgb", localStorage.getItem(localStorageConstants.customTheme.primaryRgb))
    }, [])

    useEffect(() => {
        if (!localStorageConstants.theme && isBrowserInDarkMode) {
            setActiveTheme(themes.dark)
        }
    }, [isBrowserInDarkMode, setActiveTheme])

    useEffect(() => {
        if (theme === themes.custom) {
            handleThemeModalSaveClick()
        }
    }, [theme, handleThemeModalSaveClick])

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    const themeOptionStyles = classNames(
        className,
        styles["theme-option"]
    )

    if (useThemeSelector) {
        return (
            <>
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
                                onClick={handleThemeModalOpenClick}
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
                <Modal
                    ref={themeModalElementRef}
                    title="Custom theme"
                    component={<CustomThemeForm
                        setActiveTheme={setActiveTheme}
                    />}
                    onConfirm={handleThemeModalSaveClick}
                    confirmText="Apply"
                    cancelText={false}
                />
            </>
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