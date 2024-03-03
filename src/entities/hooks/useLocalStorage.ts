import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {

        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) return initialValue
        return JSON.parse(jsonValue)
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue]
}