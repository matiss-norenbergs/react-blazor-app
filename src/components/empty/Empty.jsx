import PropTypes from "prop-types"

import FaIcon from "../faIcon"

import styles from "./Empty.module.css"

const propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string
}
const defaultProps = {
    text: "No data",
    icon: "folder-open"
}

const Empty = ({
    text,
    icon
}) => {
    return (
        <div className={styles["empty-wrapper"]}>
            <FaIcon
                className={styles["empty-icon"]}
                icon={icon}
            />
            <span className={styles["empty-text"]}>
                {text}
            </span>
        </div>
    )
}
Empty.propTypes = propTypes
Empty.defaultProps = defaultProps

export default Empty