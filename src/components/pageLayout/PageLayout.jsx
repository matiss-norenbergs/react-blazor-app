import styles from "./PageLayout.module.css"

const PageLayout = ({ children }) => {
    return (
        <section className={styles["page-wrapper"]}>
            {children}
        </section>
    )
}

export default PageLayout