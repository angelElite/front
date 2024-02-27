// api/post.js
export const postData = async (requestData,url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  export const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


export const putData = async (url,requestData) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};


export const deleteData = async (url) => {
  try {
    const response = await fetch(url, {method: 'DELETE'});
    // Verifica si la respuesta tiene contenido antes de intentar analizarla como JSON
    if (response.status === 204) {
      // 204 significa "No Content", no hay contenido para analizar
      return null;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};