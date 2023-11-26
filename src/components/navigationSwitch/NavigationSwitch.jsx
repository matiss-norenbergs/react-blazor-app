import PropTypes from "prop-types"
import { useCallback, useContext } from "react"

import ThemeContext from "../themeContext"
import FaIcon from "../faIcon"
// eslint-disable-next-line
import styles from "./NavigationSwitch.module.css"

const propTypes = {
    className: PropTypes.string
}

const NavigationSwitch = ({ className }) => {

    const { useSideNavigation, setActiveNavPostion } = useContext(ThemeContext)

    const handleNavigaionPositionChange = useCallback(() => {
        setActiveNavPostion()
    }, [setActiveNavPostion])

    return (
        <span
            className={className}
            onClick={handleNavigaionPositionChange}
        >
            <FaIcon
                icon={useSideNavigation ? "angles-up" : "angles-left"}
                fixedWidth
            />
        </span>
    )
}
NavigationSwitch.propTypes = propTypes

export default NavigationSwitch