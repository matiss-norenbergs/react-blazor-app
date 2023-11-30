const appName = "TEST-APP"

const localStorageConstants = {
    theme: `${appName}-THEME`,
    customTheme: {
        background: `${appName}-BACKGROUND`,
        background2: `${appName}-BACKGROUND-2`,
        color: `${appName}-COLOR`,
        primary: `${appName}-PRIMARY`,
        primaryRgb: `${appName}-PRIMARY-RGB`
    }
}
const themes = {
    light: "light-theme",
    dark: "dark-theme",
    custom: "custom-theme"
}
const defaultTheme = themes.light

export {
    localStorageConstants,
    themes,
    defaultTheme
}