import PropTypes from "prop-types"
import classNames from "classnames"
import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"

import ThemeContext from "components/themeContext"

import styles from "./Input.module.css"

const propTypes = {
    className: PropTypes.string
}
const defaultProps = {}

const Input = forwardRef(({
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

    useEffect(() => {
        setInputValue(rest.defaultValue)
    }, [rest.defaultValue])
    return (
        <input
            ref={inputColorElementRef}
            className={classNames(
                styles["input-wrapper"],
                styles[theme],
                className
            )}
            defaultValue={inputValue}
            onBlur={handleInputChange}
            {...rest}
        />
    )
})
Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input