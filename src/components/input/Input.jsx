import PropTypes from "prop-types"

import styles from "./Input.module.css"

const propTypes = {}
const defaultProps = {}

const Input = () => {
    return (
        <input
            className={styles["input-wrapper"]}
        />
    )
}
Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input