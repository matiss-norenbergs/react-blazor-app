import PropTypes from "prop-types"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

import { localStorageConstants, themes } from "helpers/constants"

import InputColor from "components/inputColor"

import styles from "./CustomThemeForm.module.css"

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

    const save = useCallback(() => {
        return new Promise((resolve, reject) => {
            localStorage.setItem(localStorageConstants.customTheme.background, color1.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.background2, color2.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.color, color3.current?.value)
            localStorage.setItem(localStorageConstants.customTheme.primary, color4.current?.value)
            
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
                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.background)}
                />
            </div>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Background (secondary):"}
                </label>
                <InputColor
                    ref={color2}
                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.background2)}
                />
            </div>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Text color:"}
                </label>
                <InputColor
                    ref={color3}
                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.color)}
                />
            </div>
            <div className={styles["custom-color-item"]}>
                <label className={styles["custom-color-item-label"]}>
                    {"Primary color:"}
                </label>
                <InputColor
                    ref={color4}
                    defaultValue={localStorage.getItem(localStorageConstants.customTheme.primary)}
                />
            </div>
        </div>
    )
})
CustomThemeForm.propTypes = propTypes
CustomThemeForm.defaultProps = defaultProps

export default CustomThemeForm