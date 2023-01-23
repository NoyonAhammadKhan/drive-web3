import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({contract,account,provider}) => {
    const [file,setFile]=useState(null);
    const [fileName,setFileName]=useState(null);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file",file);

                const resFile=await axios({
                    method:'post',
                    url:'https://api.pinata.cloud/pinning/pinFileToIPFS',
                    data:formData,
                    headers:{
                        pinata_api_key:`17bf2c81759580836875`,
                        pinata_secret_api_key:`f79ddeab0cc941837d082d66edc7c553e2e60d73f9ec10a7ed2a73a9a950bfdc`,
                        "Content-Type":"multipart/form-data"
                    },
                });
                const ImgHash=`ipfs://${resFile.data.IpfsHash}`;
                // const signer = contract.connect(provider.getSigner());
                contract.add(account,ImgHash);
                alert("Successfully large Image Uploaded");
                setFileName("No Image Selected");
                setFile(null);
            }catch{
                alert('Unable to upload image to pinata');
            }
        }
    }



    const retrieveFile=(e)=>{
        const data = e.target.files[0];
        console.log(data);

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    }
    return (
        <div className='top'>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className='choose'>Choose</label>
                <input type="file" id="file-upload" name="data" onChange={retrieveFile}/>
                <span className='textArea'>Image:{fileName}</span>
                <button type='submit' className='upload' disabled={!file}>Upload File</button>
                
            </form>
        </div>
    );
};

export default FileUpload;