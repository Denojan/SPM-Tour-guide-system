import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
    console.log("use toggle")
    const [value, setValue] = useLocalStorage(key, initValue);

    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }

    return [value, toggle];
}

export default useToggle