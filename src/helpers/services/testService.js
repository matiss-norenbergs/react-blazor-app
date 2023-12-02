import Database from "tauri-plugin-sql-api"

const connectionName = `mysql://${process.env.REACT_APP_MYSQL_USER}:${process.env.REACT_APP_MYSQL_PASSWORD}@localhost:${process.env.REACT_APP_MYSQL_PORT}/react`

const insertTestData = async (birthday) => {
    const db = await Database.load(connectionName)

    const result = await db.execute(
        "INSERT into birthdays (name, surname) VALUES (?, ?)",
        [birthday.name, birthday.surname]
    )

    return result
}

const updateTestData = async (birthday) => {
    const db = await Database.load(connectionName)

    const result = await db.execute(
        "UPDATE birthdays SET name = ?, surname = ? WHERE id = ?",
        [birthday.name, birthday.surname, birthday.id]
    )

    return result
}

const selectAllTestData = async () => {
    const db = await Database.load(connectionName)

    return await db.select("SELECT * FROM birthdays")
}

export {
    insertTestData,
    updateTestData,
    selectAllTestData
}