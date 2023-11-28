import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useContext, useImperativeHandle, useRef, useState, forwardRef } from "react"

import ThemeContext from "../themeContext"

import styles from "./InputColor.module.css"

const propTypes = {
    className: PropTypes.string
}
const defaultProps = {}

const InputColor = forwardRef(({
    className,
    ...rest
}, ref) => {
    const [inputValue, setInputValue] = useState("")

    const { theme } = useContext(ThemeContext)
    const inputColorElementRef = useRef(null)

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])

    useImperativeHandle(ref, () => ({
        value: inputValue
    }), [inputValue])

    return (
        <input
            ref={inputColorElementRef}
            className={classNames(
                styles["input-color"],
                styles[theme],
                className
            )}
            type="color"
            defaultValue={inputValue}
            onBlur={handleInputChange}
            {...rest}
        />
    )
})
InputColor.propTypes = propTypes
InputColor.defaultProps = defaultProps
 
export default InputColor