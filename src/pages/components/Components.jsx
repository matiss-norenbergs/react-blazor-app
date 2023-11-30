import PropTypes from "prop-types"

import Button from "components/button"
import Input from "components/input"
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
const data = [
    {
        name: "John",
        surname: "Cena"
    },
    {
        name: "Jeff",
        surname: "Price"
    },
    {
        name: "Michael",
        surname: "Ross"
    },
    {
        name: "Sven",
        surname: "Right"
    },
    {
        name: "Julie",
        surname: "Bush"
    }
]

const Components = () => {
    return (
        <div>
             <div>
                <Button.Group>
                    <Button
                        faIcon="home"
                        type="primary"
                    >
                        Homer
                    </Button>
                    <Button faIcon="person">
                        Simpson
                    </Button>
                    <Button
                        type="primary"
                        faIcon="key"
                        disabled
                    >
                        VIN
                    </Button>
                    <Button
                        faIcon="trash"
                        disabled
                    >
                        BIN
                    </Button>
                </Button.Group>
            </div>
            <div>
                <Input />
            </div>
            <DataGrid
                columnDefs={columnDefs}
                data={data}
            />
        </div>
    )
}

export default Components