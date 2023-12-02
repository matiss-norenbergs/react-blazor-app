//import PropTypes from "prop-types"

import Typography from "components/typography"

//import styles from "./Home.module.css"

const {
    Title,
    Paragraph
} = Typography

const propTypes = {}
const defaultProps = {}

const Home = () => {
    return (
        <>
            <Title level={2}>Home</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo libero numquam repellat corporis cupiditate veniam dolorum mollitia delectus! Consequatur consectetur iste sed pariatur adipisci consequuntur labore est. Ullam explicabo libero nesciunt laboriosam sunt, placeat corrupti aliquam similique? Unde, ea. Cupiditate quidem veniam in! Quisquam dolorem natus molestias amet odio labore, eius pariatur cupiditate repellat quas illum harum delectus vel facilis ad aperiam! Rem, harum quidem nihil quibusdam voluptatum praesentium mollitia deserunt soluta modi, vel sapiente fugiat atque reprehenderit aperiam et illum error assumenda, facere illo. Facilis incidunt, vero cupiditate placeat excepturi repudiandae soluta recusandae natus distinctio saepe, quam nisi facere.
            </Paragraph>
        </>
    )
}
Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home