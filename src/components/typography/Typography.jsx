import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext } from "react"

import ThemeContext from "components/themeContext"
import { Typography as AntdTypography } from "antd"

import styles from "./Typography.module.css"

const {
    Title: AntdTitle,
    Paragraph: AntdParagraph
} = AntdTypography

const propTypesTitle = {
    className: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5])
}

const Title = ({
    children,
    className,
    level
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <AntdTitle
            className={classNames(
                styles["typography"],
                styles[theme],
                className
            )}
            level={level}
        >
            {children}
        </AntdTitle>
    )
}
Title.propTypes = propTypesTitle

const propTypesParagraph = {
    className: PropTypes.string
}

const Paragraph = ({
    children,
    className
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <AntdParagraph className={classNames(
            styles["typography"],
            styles[theme],
            className
        )}>
            {children}
        </AntdParagraph>
    )
}
Paragraph.propTypes = propTypesParagraph

const Typography = {
    Title,
    Paragraph
}

export default Typography