import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from "react"

import Typography from "../typography"
import ThemeContext from "../themeContext"
import Button from "../button"

import styles from "./Modal.module.css"

const {
    Title
} = Typography

const propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    confirmText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    cancelText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    onConfirm: PropTypes.func,
    component: PropTypes.node
}
const defaultProps = {
    open: false,
    width: 450,
    confirmText: "Confirm",
    cancelText: "Cancel"
}

const Modal = forwardRef(({
    open,
    title,
    width,
    confirmText,
    cancelText,
    onConfirm,
    component
}, ref) => {
    const { theme } = useContext(ThemeContext)
    const modalElementRef = useRef(null)

    const handleOpenClick = useCallback(() => {
        modalElementRef.current?.showModal()
    }, [])

    const handleCloseClick = useCallback(() => {
        modalElementRef.current?.close()
    }, [])

    const handleConfirmBtnClick = useCallback(() => {
        if (onConfirm) {
            onConfirm()
                ?.then(() => {
                    handleCloseClick()
                })
        }
    }, [onConfirm, handleCloseClick])

    useImperativeHandle(ref, () => ({
        open: handleOpenClick,
        close: handleCloseClick
    }), [handleOpenClick, handleCloseClick])

    useEffect(() => {
        if (open) {
            handleOpenClick()
        } else {
            handleCloseClick()
        }
    }, [open, handleOpenClick, handleCloseClick])

    return (
        <dialog
            ref={modalElementRef}
            className={classNames(
                styles["modal-wrapper"],
                styles[theme]
            )}
            style={{ width: width }}
        >
            <header className={styles["modal-header"]}>
                <Title
                    className={styles["modal-title"]}
                    level={5}
                >
                    {title}
                </Title>
                <span
                    className={styles["modal-close-button"]}
                    onClick={handleCloseClick}
                >
                    &times;
                </span>
            </header>
            <div className={styles["modal-content"]}>
                {component}
            </div>
            <footer className={styles["modal-footer"]}>
                <div className={styles["modal-footer-buttons"]}>
                    {cancelText !== false && (
                        <Button>
                            {cancelText}
                        </Button>
                    )}
                    {confirmText !== false && (
                        <Button
                            type="primary"
                            onClick={handleConfirmBtnClick}
                        >
                            {confirmText}
                        </Button>
                    )}
                </div>
            </footer>
        </dialog>
    )
})
Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal