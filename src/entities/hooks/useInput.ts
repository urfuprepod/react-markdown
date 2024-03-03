import { ChangeEvent, useState } from "react"


type useInputType = [string, (e: ChangeEvent<HTMLInputElement>) => void]

export function useInput(): useInputType {
    const [value, setValue] = useState<string>('');

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return [value, onChange];
}