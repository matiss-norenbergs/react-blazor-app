import { useEffect, useMemo, useState } from "react"

function useIsInViewport(ref, options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false)

    const observer = useMemo(() =>
        new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting),
        options
    ), [options])

    useEffect(() => {
        observer.observe(ref.current)
    
        return () => {
            observer.disconnect()
        }
    }, [ref, observer])

    return isIntersecting
}

export default useIsInViewport