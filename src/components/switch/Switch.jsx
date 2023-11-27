import PropTypes from "prop-types"
import { useCallback } from "react"

import styles from "./Switch.module.css"

const propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    optionLabels: PropTypes.array,
    disabled: PropTypes.bool
}
const defaultProps = {
    optionLabels: ["No", "Yes"]
}

const Switch = ({
    value,
    onChange,
    optionLabels,
    disabled
}) => {
    const handleValueChange = useCallback(() => {
        if (onChange) {
            onChange(value)
        }
    }, [onChange, value])

    return (
        <span className={styles["switch-wrapper"]}>
            <label className={styles["toggle-switch"]}>
                <input 
                    type="checkbox"
                    checked={value}
                    onChange={handleValueChange}
                />
                <span className={styles["switch"]} />
            </label>
            <span className={styles["switch-text"]}>
                { value ? optionLabels[1] : optionLabels[0] }
            </span>
        </span>
    )
}
Switch.propTypes = propTypes
Switch.defaultProps = defaultProps

export default Switch