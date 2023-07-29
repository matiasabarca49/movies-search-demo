import { useEffect, useRef, useState } from "react"

const useSearch = ( )=>{
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')
    const isFirstSearch = useRef(false)

    useEffect( ()=>{
        if(search === "" && isFirstSearch.current){
            setError("Introduzca una Busqueda")
        }
        else if (search.length <= 3 && isFirstSearch.current){
            setError("Palabra menor a 3 Letras")
        }
        else{
            setError('')
        }
    } ,[search])

    return ({search, setSearch, error, isFirstSearch})
}

export default useSearch