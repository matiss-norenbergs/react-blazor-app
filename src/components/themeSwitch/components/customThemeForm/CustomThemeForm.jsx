import PropTypes from "prop-types"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from "react"

import { localStorageConstants, themes } from "helpers/constants"
import { hexToRgb } from "helpers/colorHelper"
import { getStyleProperty } from "helpers/domStyleHelper"

import InputColor from "components/inputColor"
import Form from "components/form"

//import styles from "./CustomThemeForm.module.css"

const propTypes = {
    setActiveTheme: PropTypes.func.isRequired
}
const defaultProps = {}

const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 }
}

const CustomThemeForm = forwardRef(({
    setActiveTheme
}, ref) => {
    const [form] = Form.useForm()

    const defaultCustomColors = useMemo(() => {
        return {
            background: localStorage.getItem(localStorageConstants.customTheme.background) ?? getStyleProperty("--custom-theme-background"),
            background2: localStorage.getItem(localStorageConstants.customTheme.background2) ?? getStyleProperty("--custom-theme-background-2"),
            color: localStorage.getItem(localStorageConstants.customTheme.color) ?? getStyleProperty("--custom-theme-color"),
            primary: localStorage.getItem(localStorageConstants.customTheme.primary) ?? getStyleProperty("--custom-theme-primary")
        }
    }, [])

    const save = useCallback(() => {
        return new Promise((resolve, reject) => {
            form.validateFields()
                .then(values => {
                    const primary = hexToRgb(values?.primary)
                    if (!primary)
                        return reject()

                    localStorage.setItem(localStorageConstants.customTheme.background, values?.background)
                    localStorage.setItem(localStorageConstants.customTheme.background2, values?.background2)
                    localStorage.setItem(localStorageConstants.customTheme.color, values?.color)
                    localStorage.setItem(localStorageConstants.customTheme.primary, values?.primary)
                    localStorage.setItem(localStorageConstants.customTheme.primaryRgb, `${primary.r}, ${primary.g}, ${primary.b}`)
                    
                    setActiveTheme(themes.custom)
                    resolve()
                })
        })
    }, [form, setActiveTheme])

    useImperativeHandle(ref, () => ({
        save: save
    }), [save])

    useEffect(() => {
        form.setFieldsValue({
            background: defaultCustomColors.background,
            background2: defaultCustomColors.background2,
            color: defaultCustomColors.color,
            primary: defaultCustomColors.primary
        })
    }, [form, defaultCustomColors])

    return (
        <Form
            form={form}
            {...formItemLayout}
        >
            <Form.Item
                label="Background"
                name="background"
            >
                <InputColor />
            </Form.Item>
            <Form.Item
                label="Background (secondary)"
                name="background2"
            >
                <InputColor />
            </Form.Item>
            <Form.Item
                label="Color"
                name="color"
            >
                <InputColor />
            </Form.Item>
            <Form.Item
                label="Primary"
                name="primary"
            >
                <InputColor />
            </Form.Item>
        </Form>
    )
})
CustomThemeForm.propTypes = propTypes
CustomThemeForm.defaultProps = defaultProps

export default CustomThemeForm