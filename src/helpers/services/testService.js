import Database from "tauri-plugin-sql-api"

const connectionName = `mysql://${process.env.REACT_APP_MYSQL_USER}:${process.env.REACT_APP_MYSQL_PASSWORD}@localhost:${process.env.REACT_APP_MYSQL_PORT}/react`

const initBirthdays = async () => {
    const db = await Database.load(connectionName)

    return await db.execute(
        "CREATE TABLE IF NOT EXISTS birthdays( birthday_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(30) NOT NULL, surname VARCHAR(30) NOT NULL, date DATE, PRIMARY KEY(birthday_id) ) ENGINE = InnoDB"
    )
}

const setTestData = async (birthday) => {
    const db = await Database.load(connectionName)

    if (birthday.id) {
        return await db.execute(
            "UPDATE birthdays SET name = ?, surname = ? WHERE birthday_id = ?",
            [birthday.name, birthday.surname, birthday.id]
        )
    }

    return await db.execute(
        "INSERT into birthdays (name, surname) VALUES (?, ?)",
        [birthday.name, birthday.surname]
    )
}

const deleteTestData = async (id) => {
    const db = await Database.load(connectionName)

    return await db.select(
        "DELETE FROM birthdays WHERE birthday_id = ?",
        [id]
    )
}

const selectAllTestData = async () => {
    const db = await Database.load(connectionName)

    return await db.select("SELECT *, birthday_id AS id FROM birthdays")
}

const selectTestData = async (id) => {
    const db = await Database.load(connectionName)

    return await db.select(
        "SELECT *, birthday_id AS id FROM birthdays WHERE birthday_id = ? LIMIT 1",
        [id]
    )
}

export {
    initBirthdays,
    setTestData,
    deleteTestData,
    selectAllTestData,
    selectTestData
}