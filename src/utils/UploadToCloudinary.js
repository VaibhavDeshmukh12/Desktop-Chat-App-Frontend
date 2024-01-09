const cloud_name = "dweizo4nu"
const preset_name = "social_app"

export const uploadToCloudiNary = async(pics,fileType)=>{
    if(pics && fileType){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset",preset_name);
        data.append("cloud_name",cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,{method:"post",body:data});

        console.log("res",res)

        const fileData = await res.json();
        console.log('filedata url:>> ', fileData.url);
        return fileData.url;
    }
    else
        console.log('error in uploading.........');
}