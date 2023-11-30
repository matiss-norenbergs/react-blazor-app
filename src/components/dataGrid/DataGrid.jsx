import PropTypes from "prop-types"
import classNames from "classnames"
import { useCallback, useContext, useRef } from "react"

import { AgGridReact } from "ag-grid-react"

import ThemeContext from "../themeContext"

import "./DataGridBase.css"
import styles from "./DataGrid.module.css"

const propTypes = {
    columnDefs: PropTypes.array,
    data: PropTypes.array,
    bulkOperationMode: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    toolbar: PropTypes.node,
    getSelectedRows: PropTypes.func
}
const defaultProps = {}

const DataGrid = ({
    columnDefs,
    data,
    bulkOperationMode,
    width,
    toolbar,
    getSelectedRows
}) => {
    const { theme } = useContext(ThemeContext)
    const dataGridElementRef = useRef(null)

    const onSelectionChanged = useCallback(() => {
        const selectedRows = dataGridElementRef.current?.api?.getSelectedRows() || []

        if (getSelectedRows) {
            getSelectedRows(selectedRows)
        }
    }, [getSelectedRows])

    return (
        <div
            className={classNames(
                styles["data-grid-wrapper"],
                styles["ag-theme-alpine"],
                styles[theme]
            )}
            style={{
                width: width
            }}
        >
            {!!toolbar && (
                <div className={styles["data-grid-toolbar"]}>
                    {toolbar}
                </div>
            )}
            <AgGridReact
                ref={dataGridElementRef}
                columnDefs={columnDefs}
                rowData={data}
                headerHeight={30}
                rowHeight={24}
                rowSelection={bulkOperationMode ? "multiple" : "single"}
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    )
}
DataGrid.propTypes = propTypes
DataGrid.defaultProps = defaultProps

export default DataGrid