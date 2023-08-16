export const useCloudinary = () => {
    const openCloudinaryWidget = (): Promise<{img: string, tmb: string}> => {
        return new Promise((resolve, reject) => {
            const openCloudinaryWidget = window.cloudinary.createUploadWidget({
                cloudName: 'db86bp74r',
                uploadPreset: 'ml_default',
                sources: ["local", "camera", "url"],
            },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        const img = result.info.url;
                        const tmb = result.info.thumbnail_url;
    
                        resolve({ img, tmb });
                    }

                    if (error) reject('Oops, something went wrong uploading the image!')
                }
            );
    
            openCloudinaryWidget.open()
        })
    }

    return {
        openCloudinaryWidget
    }
}