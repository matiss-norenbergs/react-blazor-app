import PropTypes from "prop-types"

import Button from "components/button"
import Input from "components/input"

import styles from "./Components.module.css"

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
            <Input />
        </div>
    )
}

export default Components