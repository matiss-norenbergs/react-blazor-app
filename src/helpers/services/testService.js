import Database from "tauri-plugin-sql-api"

// const db = await Database.load("mysql://user:pass@host/database")

const connectionName = "mysql://root:Parole1@localhost:3307/react"

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