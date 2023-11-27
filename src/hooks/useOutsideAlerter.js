const { useEffect } = require("react")

function useOutsideAlerter(ref, onOutsideClick) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && onOutsideClick) {
                onOutsideClick()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        // eslint-disable-next-line
    }, [ref])
}

export default useOutsideAlerter