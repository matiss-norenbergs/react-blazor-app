import PropTypes from "prop-types"
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react"

import { localStorageConstants, themes } from "helpers/constants"
import { hexToRgb } from "helpers/colorHelper"

import InputColor from "components/inputColor"

import styles from "./CustomThemeForm.module.css"
import { getStyleProperty } from "helpers/domStyleHelper"

const propTypes = {
    setActiveTheme: PropTypes.func.isRequired
}
const defaultProps = {}

const CustomThemeForm = forwardRef(({
    setActiveTheme
}, ref) => {
    const color1 = useRef(null)
    const color2 = useRef(null)
    const color3 = useRef(null)
    const color4 = useRef(null)

    const defaultCustomColors = useMemo(() => {
        return {
            background: localStorage.getItem(localStorageConstants.customTheme.background) ?? getStyleProperty("--custom-theme-background"),
            background2: localStorage.getItem(localStorageConstants.customTheme.background2) ?? getStyleProperty("--custom-theme-background-2"),
            color: localStorage.getItem(localStorageConstants.customTheme.color) ?? getStyleProperty("--custom-theme-color"),
            primary: localStorage.getItem(localStorageConstants.customTheme.primary) ?? getStyleProperty("--custom-theme-primary")
        }
    }, [])

    const save = useCallback(() => {
        return new Promise((resolve, reject) => {
            const primary = hexToRgb(color4.current?.value)
            if (!primary)
                return reject()

            localStorage.setItem(localStorageConstants.customTheme.background, color1.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.background2, color2.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.color, color3.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.primary, color4.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.primaryRgb, `${primary.r}, ${primary.g}, ${primary.b}`)
            
            setActiveTheme(themes.custom)
            resolve()
        })
    }, [setActiveTheme])

    useImperativeHandle(ref, () => ({
        save: save
    }), [save])

    return (
        <div className={styles["custom-color-table"]}>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Background:"}
                </label>
                <InputColor
                    ref={color1}
                    defaultValue={defaultCustomColors.background}
                />
            </div>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Background (secondary):"}
                </label>
                <InputColor
                    ref={color2}
                    defaultValue={defaultCustomColors.background2}
                />
            </div>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Text color:"}
                </label>
                <InputColor
                    ref={color3}
                    defaultValue={defaultCustomColors.color}
                />
            </div>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Primary color:"}
                </label>
                <InputColor
                    ref={color4}
                    defaultValue={defaultCustomColors.primary}
                />
            </div>
        </div>
    )
})
CustomThemeForm.propTypes = propTypes
CustomThemeForm.defaultProps = defaultProps

export default CustomThemeForm