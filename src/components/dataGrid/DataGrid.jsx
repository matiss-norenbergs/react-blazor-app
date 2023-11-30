import PropTypes from "prop-types"
import classNames from "classnames"
import { useContext } from "react"
import { AgGridReact } from "ag-grid-react"

import ThemeContext from "../themeContext"

import "./DataGridBase.css"
import styles from "./DataGrid.module.css"

const propTypes = {
    columnDefs: PropTypes.array,
    data: PropTypes.array,
    bulkOperationMode: PropTypes.bool
}
const defaultProps = {}

const DataGrid = ({
    columnDefs,
    data,
    bulkOperationMode
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div
            className={classNames(
                styles["ag-theme-alpine"],
                styles[theme]
            )}
            style={{width: 500, height: 500}}
        >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={data}
                headerHeight={30}
                rowHeight={24}
                rowSelection={bulkOperationMode ? "multiple" : "single"}
            />
        </div>
    )
}
DataGrid.propTypes = propTypes
DataGrid.defaultProps = defaultProps

export default DataGrid