import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useRef, useState } from "react"

import styles from "./Tooltip.module.css"

const propTypes = {
    text: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["top", "right", "bottom", "left"]),
    delay: PropTypes.number,
    children: PropTypes.node.isRequired
}
const defaultProps = {
    direction: "top",
    delay: 400
}

const Tooltip = ({
    text,
    direction,
    delay,
    children
}) => {
    const [active, setActive] = useState(false)
    const timeoutRef = useRef(null)

    const showTip = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setActive(true)
        }, delay)
    }, [delay])

    const hideTip = useCallback(() => {
        clearInterval(timeoutRef.current)
        setActive(false)
    }, [])

    return (
        <div
            className={styles["tooltip"]}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {active && text && (
                <div className={classNames(
                    styles["tooltip-text"],
                    styles[direction]
                )}>
                    {text}
                </div>
            )}
        </div>
    )
}
Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps
 
export default Tooltip