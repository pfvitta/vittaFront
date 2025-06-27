export const handleImageUpload = async (file: File, userId: string) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`http://localhost:3001/files/uploadImage/${userId}`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const result = await response.json();
      console.log("Imagen subida:", result);
      return result; // por ejemplo, la URL en Cloudinary
    } catch (error) {
      console.error("Error subiendo imagen:", error);
    }
  };
  