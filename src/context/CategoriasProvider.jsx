import { useState, useEffect, createContext } from "react";
import axios from "axios";

const CategoriasContext = createContext() 

const CategoriasProvider = ({children}) => {

    const [categorias,setCategorias]=useState([]) 

    const obtenerCategorias = async () => {
        try {
            const url=`${import.meta.env.VITE_API_URL}list.php?c=list`
            const {data} = await axios(url)

            setCategorias(data.drinks);

        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(()=>{
        obtenerCategorias()
    },[])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export {
    CategoriasProvider
}

export default CategoriasContext