export const uploadImageToCloudinary = async (file: File, folder: string): Promise<string | null> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CCLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
        console.error('Missing Cloudinary config!');
        return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append("folder", folder);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data.secure_url; // Cloudinary URL
    } catch (error) {
        console.error('Upload error:', error);
        return null;
    }
};
