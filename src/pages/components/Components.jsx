import PropTypes from "prop-types"
import { useCallback, useState } from "react"

import Button from "components/button"
import DataGrid from "components/dataGrid"

import styles from "./Components.module.css"

const columnDefs = [
    {
        field: "name"
    },
    {
        field: "surname"
    }
]
const tmpData = [
    {
        id: "1",
        name: "John",
        surname: "Cena"
    },
    {
        id: "2",
        name: "Jeff",
        surname: "Price"
    },
    {
        id: "3",
        name: "Michael",
        surname: "Ross"
    },
    // {
    //     id: "4",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "5",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "6",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "7",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "8",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "9",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "10",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "11",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "12",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "13",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "14",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "15",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "16",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "17",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "18",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "19",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "20",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "01",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "02",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "03",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "04",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "05",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "06",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "07",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "08",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "09",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "010",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "011",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "012",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "013",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "014",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "015",
    //     name: "Julie",
    //     surname: "Bush"
    // },
    // {
    //     id: "016",
    //     name: "John",
    //     surname: "Cena"
    // },
    // {
    //     id: "017",
    //     name: "Jeff",
    //     surname: "Price"
    // },
    // {
    //     id: "018",
    //     name: "Michael",
    //     surname: "Ross"
    // },
    // {
    //     id: "019",
    //     name: "Sven",
    //     surname: "Right"
    // },
    // {
    //     id: "020",
    //     name: "Julie",
    //     surname: "Bush"
    // },
]

const Components = () => {

    const [data, setData] = useState(tmpData)
    const [selectedRows, setSelectedRows] = useState([])

    const getSelectedRows = useCallback((newRows) => {
        setSelectedRows(newRows)
    }, [])

    const createNewData = useCallback(() => {
        const newObj = {
            id: "test",
            name: "Audi",
            surname: "A6"
        }

        setData(prevState => {
            return [...prevState, newObj]
        })
    }, [])

    const isBtnActionDisabled = selectedRows.length !== 1

    const toolbar = (
        <Button.Group>
            <Button
                type="primary"
                faIcon="plus"
                onClick={createNewData}
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
                disabled={isBtnActionDisabled}
            >
                Delete
            </Button>
        </Button.Group>
    )

    return (
        <DataGrid
            toolbar={toolbar}
            columnDefs={columnDefs}
            data={data}
            getSelectedRows={getSelectedRows}
        />
    )
}

export default Components