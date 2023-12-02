import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext } from "react"

import ThemeContext from "../themeContext"

import styles from "./OverlayLoader.module.css"

const propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool
}
const defaultProps = {}

const OverlayLoader = ({
    children,
    isLoading
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={classNames(
            styles["overlay-loader-wrapper"],
            styles[theme]
        )}>
            {isLoading && (
                <div className={styles["overlay-loader-content"]}>
                    Loading...
                </div>
            )}
            {children}
        </div>
    )
}
OverlayLoader.propTypes = propTypes
OverlayLoader.defaultProps = defaultProps

export default OverlayLoader