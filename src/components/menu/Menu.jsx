import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useRef, useState } from "react"

import useOutsideAlerter from "hooks/useOutsideAlerter"

import styles from "./Menu.module.css"

const propTypes = {
    items: PropTypes.array,
    trigger: PropTypes.oneOf(["hover", "click"]),
    position: PropTypes.string
}
const defaulProps = {
    trigger: "click",
    position: "left"
}

const Menu = ({
    children,
    items = [],
    //trigger
    position
}) => {
    const [visible, setVisible] = useState(false)

    const menuElementRef = useRef(null)

    const onHandleChangeMenuVisibility = useCallback((event) => {
        event.preventDefault()

        setVisible(prevState => !prevState)
    }, [])

    const onOutsideClick = useCallback(() => {
        setVisible(false)
    }, [])

    useOutsideAlerter(menuElementRef, onOutsideClick)

    return (
        <span
            ref={menuElementRef}
            className={styles["menu-wrapper"]}
            onClick={onHandleChangeMenuVisibility}
        >
            {children}
            {visible && items.length > 0 ? (
                <div className={classNames(
                    styles["menu-content"],
                    {
                        [styles["position-right"]]: position === "right",
                        [styles["position-left"]]: position !== "right"
                    }
                )}>
                    {items.map((item) => (
                        <Item
                            key={item.key}
                            onClick={item.onClick}
                        >
                            {item.label}
                        </Item>
                    ))}
                </div>
            ) : null}
        </span>
    )
}
Menu.propTypes = propTypes
Menu.defaulProps = defaulProps

const Item = ({
    children,
    onClick
}) => {
    const onItemClick = useCallback((e, onClick) => {
        e.stopPropagation()

        onClick && onClick()
    }, [])

    return (
        <span
            className={styles["menu-item"]}
            onClick={event => onItemClick(event, onClick)}
        >
            {children}
        </span>
    )
}
Menu.Item = Item

export default Menu