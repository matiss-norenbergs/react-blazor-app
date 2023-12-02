import PropTypes from "prop-types"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

import { insertTestData } from "helpers/services/testService"

import Input from "components/input"

import styles from "./BirthdayForm.module.css"

const propTypes = {
    id: PropTypes.number
}
const defaultProps = {}

const BirthdayForm = forwardRef(({
    id
}, ref) => {
    const nameRef = useRef(null)
    const surnameRef = useRef(null)

    const save = useCallback(() => {
        return new Promise((resolve, reject) => {
            const birthdayObj = {
                name: nameRef.current?.value,
                surname: surnameRef.current?.value
            }
    
            insertTestData(birthdayObj)
                .then(() => {
                    return resolve()
                })
                .catch(() =>{
                    reject()
                })
        })
    }, [])

    useImperativeHandle(ref, () => ({
        save: save
    }), [save])

    return (
        <div className={styles["birthday-form"]}>
            <div className={styles["form-item"]}>
                <label className={styles["item-label"]}>
                    {"Name:"}
                </label>
                <Input
                    ref={nameRef}
                />
            </div>
            <div className={styles["form-item"]}>
                <label className={styles["item-label"]}>
                    {"Surname:"}
                </label>
                <Input
                    ref={surnameRef}
                />
            </div>
        </div>
    )
})
BirthdayForm.propTypes = propTypes
BirthdayForm.defaultProps = defaultProps

export default BirthdayForm