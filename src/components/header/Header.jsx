import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext } from "react"
import { isElement, isString } from "lodash"
import { Image } from "antd"
import { NavLink } from "react-router-dom"

import { ThemeContext } from "components/themeContext/ThemeContext"

import ThemeSelect from "../themeSelect"
import FaIcon from "../faIcon"

import styles from "./Header.module.css"

const propTypes = {
    logo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    paths: PropTypes.array,
    extraContent: PropTypes.node,
    useSideNavigation: PropTypes.bool
}
const defaultProps = {
    paths: [],
    useSideNavigation: false
}

const Header = ({
    logo,
    paths,
    extraContent,
    useSideNavigation
}) => {

    const { theme } = useContext(ThemeContext)

    let headerLogo = null

    if (isString(logo)) {
        headerLogo = <Image
            className={styles["header-logo"]}
            src={logo}
            preview={false}
        />
    } else if (isElement(logo)) {
        headerLogo = logo
    }

    return (
        <header className={classNames(
            styles["header-wrapper"],
            styles[theme],
            {
                [styles["use-side-navigation"]]: useSideNavigation
            }
        )}>
            {headerLogo}
            <div className={styles["header-contents"]}>
                {paths.length > 0 && (
                    <nav className={styles["header-paths"]}>
                        {paths.map(({ path, title, icon }) => (
                            <NavLink
                                key={path}
                                className={({ isActive }) => classNames(
                                    styles["link"],
                                    {
                                        [styles["active-link"]]: isActive
                                    }
                                )}
                                to={path}
                            >
                                {!!icon && (
                                    <FaIcon
                                        icon={icon}
                                        padded
                                    />
                                )}
                                {title}
                            </NavLink>
                        ))}
                    </nav>
                )}
                {extraContent}
                <ThemeSelect />
            </div>
        </header>
    )
}
Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header