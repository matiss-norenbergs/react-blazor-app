import PropTypes from "prop-types"
import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react"

import { selectTestData, setTestData } from "helpers/services/testService"

import { message } from "antd"

import Form from "components/form"
import Input from "components/input"

//import styles from "./BirthdayForm.module.css"

const propTypes = {
    id: PropTypes.number
}
const defaultProps = {}

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}
const formItemRules = [{
    required: true,
    whitespace: true,
    message: "This field is required!"
}]

const BirthdayForm = forwardRef(({
    id
}, ref) => {
    const [form] = Form.useForm()

    const getFormData = useCallback((id) => {
        selectTestData(id)
                .then(data => {
                    const respData = data[0]
                    
                    form.setFieldsValue({
                        name: respData?.name,
                        surname: respData?.surname
                    })
                })
    }, [form])

    const save = useCallback(() => {
        return new Promise((resolve, reject) => {
            form.validateFields()
                .then(values => {
                    const formData = Object.assign({}, values)

                    if (id) {
                        Object.assign(formData, {
                            id: id
                        })
                    }

                    setTestData(formData)
                        .then(() => {
                            message.success("Data saved successfully!")
                            return resolve()
                        })
                        .catch(() =>{
                            message.error("Error saving birthday!")
                            return reject()
                        })
                })
                .catch(() => {
                    reject()
                })
        })
    }, [form, id])

    useImperativeHandle(ref, () => ({
        save: save
    }), [save])

    useEffect(() => {
        if (id) {
            getFormData(id)
        }
    }, [id, getFormData])

    return (
        <Form
            form={form}
            {...formItemLayout}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={formItemRules}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Surname"
                name="surname"
                rules={formItemRules}
            >
                <Input />
            </Form.Item>
        </Form>
    )
})
BirthdayForm.propTypes = propTypes
BirthdayForm.defaultProps = defaultProps

export default BirthdayForm