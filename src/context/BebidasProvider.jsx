import { useState, useEffect, createContext } from "react";
import axios from "axios";

const BebidasContext = createContext() 

const BebidasProvider = ({children}) => {

    const [bebidas,setBebidas] = useState([])
    const [modal,setModal] = useState(false)
    const [bebidaId,setBebidaId] = useState("")
    const [receta,setReceta] = useState({})
    const [cargando,setCargando] = useState(false) 

    useEffect(()=>{
        setCargando(true)
        const obtenerReceta = async () => {
            if(!bebidaId) return
            try {
                const url = `${import.meta.env.VITE_API_URL}lookup.php?i=${bebidaId}`
                const {data} = await axios(url)
                setReceta(data.drinks[0]);
            } catch (error) {
                console.log("Error");
            }finally{
                setCargando(false);
            }
        }
        obtenerReceta()
    },[bebidaId])

    const consultarBebidas = async datos => {
        try {
            const url = `${import.meta.env.VITE_API_URL}filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const {data} = await axios(url)
            setBebidas(data.drinks);            
        } catch (error) {
            console.log("Error");
        }
    }

    const handleModalClick = () =>{
        setModal(!modal)
    }

    const handleBebidaId = id => {
        setBebidaId(id)
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebidas,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaId,
                receta,
                cargando
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext