import PropTypes from "prop-types"

import styles from "./Dropdown.module.css"

const propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            onClick: PropTypes.func
        })
    ),
    onItemClick: PropTypes.func,
    menuPosition: PropTypes.oneOf([
        "left",
        "right"
    ])
}
const defaultProps = {
    menuPosition: "left"
}

const Dropdown = ({ children, items = [], onItemClick, menuPosition }) => {

    const handleItemClick = (key, itemFunc) => {
        if (onItemClick) {
            onItemClick(key)
        }
        if (itemFunc) {
            itemFunc()
        }
    }

    const dropdownContentPosition = menuPosition === "left" ? { left: 0 } : { right: 0 }

    return (
        <div className={styles["dropdown"]}>
            { children }
            <div
                className={styles["dropdown-content"]}
                style={dropdownContentPosition}
            >
                { items.map(({ key, value, onClick }) => (
                    <span
                        className={styles["dropdown-item"]}
                        key={key}
                        onClick={() => handleItemClick(key, onClick)}
                    >
                        { value }
                    </span>
                )) }
            </div>
        </div>
    )
}
Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps
 
export default Dropdown