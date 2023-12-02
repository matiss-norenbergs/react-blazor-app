import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext } from "react"

import ThemeContext from "../themeContext"
import FaIcon from "../faIcon"

import styles from "./Button.module.css"

const buttonType = {
    default: "default",
    primary: "primary"
}

const propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    type: PropTypes.oneOf(Object.values(buttonType)),
    faIcon: PropTypes.string
}
const defaultProps = {
    type: buttonType.default
}

const Button = ({
    children,
    className,
    onClick,
    disabled,
    active,
    type,
    faIcon,
    ...rest
}) => {
    const { theme } = useContext(ThemeContext)

    const buttonIcon = faIcon ? (
        <FaIcon
            icon={faIcon}
            padded={!!children}
        />
    ) : null

    return (
        <button
            className={classNames(
                styles["button-wrapper"],
                styles[type],
                {
                    [styles["button-disabled"]]: disabled,
                    [styles["button-active"]]: active
                },
                styles[theme],
                className
            )}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {buttonIcon}
            {children}
        </button>
    )
}
Button.propTypes = propTypes
Button.defaultProps = defaultProps

const Group = ({ children }) => {
    return (
        <div className={styles["button-group"]}>
            {children}
        </div>
    )
}
Button.Group = Group

export default Button