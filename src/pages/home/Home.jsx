import PropTypes from "prop-types"

import Button from "components/button"

import styles from "./Home.module.css"

const propTypes = {}
const defaultProps = {}

const Home = () => {
    return (
        <>
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
        </>
    )
}
Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home