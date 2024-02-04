import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload the file
        const response = await cloudinary.uploader.upload(localFilePath,
        { 
            resource_type: "auto"
        });
        //file uploaded successfully
        console.log("file uploaded successfully",response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (url) =>{
    cloudinary.api.delete_resources(url, 
    { type: 'upload', resource_type: 'image' })
    .then(()=>{
        console.log("success")
        return true
    })
    .catch(error=>{
        console.log(error);
        return false
    })
}
export {
    uploadOnCloudinary,
    deleteFromCloudinary
}