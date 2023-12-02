function setStyleProperty(propName, propValue) {
    document.querySelector(":root").style.setProperty(propName, propValue)
}

function getStyleProperty(propName) {
    return getComputedStyle(document.documentElement).getPropertyValue(propName)
} 

export {
    setStyleProperty,
    getStyleProperty
}