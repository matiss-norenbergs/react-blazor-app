//import PropTypes from "prop-types"
import { useCallback, useEffect, useRef, useState } from "react"

import { deleteTestData, selectAllTestData } from "helpers/services/testService"

import Button from "components/button"
import DataGrid from "components/dataGrid"
import OverlayLoader from "components/overlayLoader"
import Modal from "components/modal"

import BirthdayForm from "./components/birthdayForm"

import styles from "./Components.module.css"

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

    const isRowSelected = selectedRows.length === 1

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

    const handleEditBtnClick = useCallback(() => {
        if (selectedRows.length !== 1)
            return

        birthdayModalRef.current?.open({ id: selectedRows[0].id })
    }, [selectedRows])

    const handleDeleteBtnClick = useCallback(() => {
        if (selectedRows.length !== 1)
            return

        deleteTestData(selectedRows[0].id)
            .then(() => {
                getGridData()
            })
    }, [selectedRows, getGridData])

    useEffect(() => {
        getGridData()
    }, [getGridData])

    const isBtnActionDisabled = isDataLoading || !isRowSelected

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
                    onClick={handleEditBtnClick}
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