import PropTypes from "prop-types"
import { useCallback, useEffect, useRef, useState } from "react"

import Button from "components/button"
import DataGrid from "components/dataGrid"
import OverlayLoader from "components/overlayLoader"

import styles from "./Components.module.css"
import { selectAllTestData } from "helpers/services/testService"
import Modal from "components/modal"
import BirthdayForm from "./components/birthdayForm"

const columnDefs = [
    {
        headerClass: styles["header"],
        field: "select",
        checkboxSelection: true,
        width: 60
    },
    {
        field: "name",
        headerName: "Name"
    },
    {
        field: "surname",
        headerName: "Surname"
    }
]

const Components = () => {

    const [isDataLoading, setIsDataLoading] = useState(false)
    const [data, setData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])

    const birthdayModalRef = useRef(null)

    const isBtnActionDisabled = isDataLoading || selectedRows.length !== 1

    const getGridData = useCallback(() => {
        setIsDataLoading(true)

        selectAllTestData()
            .then(data => {
                setData(data)
                setIsDataLoading(false)
            })
    }, [])

    const getSelectedRows = useCallback((newRows) => {
        setSelectedRows(newRows)
    }, [])

    const handleCreateBtnClick = useCallback(() => {
        birthdayModalRef.current?.open()
    }, [])

    const handleDeleteBtnClick = useCallback(() => {
        setData(prevState => {
            return prevState.filter(item => item.id !== selectedRows[0].id)
        })
    }, [selectedRows])

    useEffect(() => {
        getGridData()
    }, [getGridData])

    const toolbar = (
        <>
            <Button.Group>
                <Button
                    type="primary"
                    faIcon="plus"
                    onClick={handleCreateBtnClick}
                >
                    Create
                </Button>
                <Button
                    faIcon="edit"
                    disabled={isBtnActionDisabled}
                >
                    Edit
                </Button>
                <Button
                    faIcon="trash-alt"
                    onClick={handleDeleteBtnClick}
                    disabled={isBtnActionDisabled}
                >
                    Delete
                </Button>
            </Button.Group>
            <Button
                faIcon="sync"
                onClick={getGridData}
                disabled={isDataLoading}
            >
                Get data
            </Button>
        </>
    )

    return (
        <OverlayLoader isLoading={isDataLoading}>
            <DataGrid
                toolbar={toolbar}
                columnDefs={columnDefs}
                data={data}
                getSelectedRows={getSelectedRows}
                bulkOperationMode
            />
            <Modal
                ref={birthdayModalRef}
                title="Birthday create"
                component={
                    <BirthdayForm />
                }
                onConfirm={getGridData}
            />
        </OverlayLoader>
    )
}

export default Components