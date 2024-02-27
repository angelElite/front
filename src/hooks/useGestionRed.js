import { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function useApiRequest(url,method,body,id) {
  const [data, setData] = useState([]); //estado inicial del los datos
  const [loading, setLoading] = useState(true);//estado de carga de los datos
  const [error, setError] = useState(true);//estado de errores
  const cache = useRef({});//cargar los tados en el cahe del navegador para no hacer peticiones cada ves que se valla a una visa (no me sale)


  



  useEffect(() => {
    const fetchData = async () => {
      //se verifica si hay datos en el cache para no hacer la peticon 
      setLoading(true);
      setError(null);

      if (cache.current[url]) {
        setData(cache.current[url]); 
        setLoading(false);
        return;
      }
      try {
        // Tipos de peticiones dependiendo del método
        let response;
        if (method === "GET") {
          response = await fetch(url); // Función de React para hacer las peticiones a la API
        } else if (method === "POST") {
          response = await fetch(url, {method: method,body: JSON.stringify(body) });
        } else if (method === "DELETE") {
          response = await fetch(`${url}/${id}`, { method: "DELETE" });
        } else if (method === 'PUT'){
          
        }

        const responseData = await response.json();

        cache.current[url] = responseData; // Se guarda los datos en el caché
        setData(responseData);
        setLoading(false);
      }catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);
  return {
    data,
    loading,
    error
  };
}
