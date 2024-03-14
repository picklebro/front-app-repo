import React, { useState, useEffect } from 'react';
import './VideoUpload.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [preSignedUrl, setPreSignedUrl] = useState('');

  const location = useLocation();
  const countryCode = new URLSearchParams(location.search).get('countryCode');

  console.log(countryCode);



  useEffect(() => {
    if (fileName) {
      const getPreSignedUrl = async () => {
        try {
          const response = await axios.get(`https://cyibwfs3a8.execute-api.ap-northeast-2.amazonaws.com/new/pre-signed-url?file_name=${fileName}&object_prefix=${countryCode}`);
          const preSignedUrl = response.data;

          setPreSignedUrl(preSignedUrl);
          console.log(preSignedUrl);
        } catch (error) {
          console.error('Error fetching pre-signed URL:', error.message);
        }
      };
      console.log(countryCode)
      getPreSignedUrl();
    }
  }, [fileName,countryCode]);


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const fileName = file.name;

  //   setSelectedFile(file);
  //   setFileName(fileName);
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const randomFileName = generateRandomFileName(); // 랜덤 파일 이름 생성 함수 호출
    const modifiedFileName = `${randomFileName}.${file.name.split('.').pop()}`; // 확장자 유지
  
    setSelectedFile(file);
    setFileName(modifiedFileName);
  };
  

  const generateRandomFileName = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10; // 파일 이름의 길이를 조절할 수 있습니다.
    let randomFileName = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomFileName += characters.charAt(randomIndex);
    }
  
    return randomFileName;
  };

  const handleUpload = async () => {
    if (selectedFile && preSignedUrl) {
      try {
        setIsUploading(true);
        setProgress(0);

        const response = await axios.put(preSignedUrl, selectedFile, {
          headers: {
            'Content-Type': selectedFile.type,
            'Access-Control-Allow-Origin': '*',  
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT',  
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });

        console.log('Upload successful!', response);
        handleUploadSuccess();
      } catch (error) {
        console.error('Error uploading file:', error.message);
      } finally {
        setIsUploading(false);
      }
    } else {
      console.error('No file or pre-signed URL available.');
    }
  };

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    // 업로드 성공 시 추가 로직 수행
  };

  return (
    <div className='video-upload-wrapper'>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        Upload
      </button>
      {isUploading && <progress value={progress} max={100} />}
      {uploadSuccess && <p>Upload Success!</p>}
      {fileName && <p>File Name: {fileName}</p>}
      {preSignedUrl && <p>Pre-signed URL: {preSignedUrl}</p>}
    </div>
  );
};

export default VideoUpload;
