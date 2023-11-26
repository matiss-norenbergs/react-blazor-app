import PropTypes from "prop-types"

import FaIcon from "components/faIcon"
// eslint-disable-next-line
import styles from "./FullscreenSwitch.module.css"

const propTypes = {
    className: PropTypes.string
}

const FullscreenSwitch = ({ className }) => {

    const isFullscreen = false

    return (
        <span
            className={className}
            //onClick={handleNavigaionPositionChange}
        >
            <FaIcon
                icon={isFullscreen ? "compress" : "expand"}
                fixedWidth
            />
        </span>
    )
}
FullscreenSwitch.propTypes = propTypes

export default FullscreenSwitch