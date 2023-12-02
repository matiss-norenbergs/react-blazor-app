//import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext } from "react"

import { Form as AntForm } from "antd"

import ThemeContext from "../themeContext"

import styles from "./Form.module.css"

const propTypes = {}
const defaultProps = {}

const Form = ({
    children,
    ...rest
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <AntForm
            className={classNames(
                styles["form-wrapper"],
                styles[theme]
            )}
            {...rest}
        >
            {children}
        </AntForm>
    )
}
Form.propTypes = propTypes
Form.defaultProps = defaultProps

const Item = ({
    children,
    ...rest
}) => {
    return (
        <AntForm.Item {...rest}>
            {children}
        </AntForm.Item>
    )
}
Form.Item = Item
Form.useForm = AntForm.useForm

export default Form