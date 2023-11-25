const appName = "TEST-APP"

const localStorageConstants = {
    theme: `${appName}-THEME`
}
const themes = {
    light: "light-theme",
    dark: "dark-theme"
}
const defaultTheme = themes.light

export {
    localStorageConstants,
    themes,
    defaultTheme
}