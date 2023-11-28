import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useContext, useEffect, useRef } from "react"

import { localStorageConstants, themes } from "helpers/constants"
import useThemeDetector from "hooks/useThemeDetector"

import ThemeContext from "../themeContext"
import FaIcon from "../faIcon"
import Modal from "../modal"

import styles from "./ThemeSwitch.module.css"
import InputColor from "components/inputColor"

const propTypes = {
    className: PropTypes.string,
    useThemeSelector: PropTypes.bool,
    useSideNavigation: PropTypes.bool
}

const setStyle = document.querySelector(":root").style

const ThemeSelect = ({
    className,
    useThemeSelector,
    useSideNavigation
}) => {
    const { theme, setActiveTheme } = useContext(ThemeContext)
    const isBrowserInDarkMode = useThemeDetector()
    const themeModalElementRef = useRef(null)
    const color1 = useRef(null)
    const color2 = useRef(null)
    const color3 = useRef(null)
    const color4 = useRef(null)

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

    const handleModalSave = useCallback(() => {
        return new Promise((resolve, reject) => {
            localStorage.setItem(localStorageConstants.customTheme.background, color1.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.background2, color2.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.color, color3.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.primary, color4.current?.value)
            
            setActiveTheme(themes.custom)
            resolve()
        })
    }, [setActiveTheme])

    useEffect(() => {
        if (!localStorageConstants.theme && isBrowserInDarkMode) {
            setActiveTheme(themes.dark)
        }
    }, [isBrowserInDarkMode, setActiveTheme])

    useEffect(() => {
        if (theme === themes.custom) {
            setTimeout(() => {
                setStyle.setProperty("--custom-theme-background", localStorage.getItem(localStorageConstants.customTheme.background))
                setStyle.setProperty("--custom-theme-background-2", localStorage.getItem(localStorageConstants.customTheme.background2))
                setStyle.setProperty("--custom-theme-color", localStorage.getItem(localStorageConstants.customTheme.color))
                setStyle.setProperty("--custom-theme-primary", localStorage.getItem(localStorageConstants.customTheme.primary))
            }, 0)
        }
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
                    component={
                        <div className={styles["custom-color-table"]}>
                            <div className={styles["custom-color-item"]}>
                                <label className={styles["custom-color-item-label"]}>
                                    Background color:
                                </label>
                                <InputColor
                                    ref={color1}
                                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.background)}
                                />
                            </div>
                            <div className={styles["custom-color-item"]}>
                                <label className={styles["custom-color-item-label"]}>
                                    Background color 2:
                                </label>
                                <InputColor
                                    ref={color2}
                                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.background)}
                                />
                            </div>
                            <div className={styles["custom-color-item"]}>
                                <label className={styles["custom-color-item-label"]}>
                                    Text color:
                                </label>
                                <InputColor
                                    ref={color3}
                                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.background)}
                                />
                            </div>
                            <div className={styles["custom-color-item"]}>
                                <label className={styles["custom-color-item-label"]}>
                                    Primary color:
                                </label>
                                <InputColor
                                    ref={color4}
                                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.background)}
                                />
                            </div>
                        </div>
                    }
                    confirmText="Apply"
                    cancelText={false}
                    onConfirm={handleModalSave}
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