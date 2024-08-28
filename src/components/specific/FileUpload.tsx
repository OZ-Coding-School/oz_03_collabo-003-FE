import React, { useState } from 'react';

interface FileUploadProps {
  setContentImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setContentImages }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files).filter(isImageFile);

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles].slice(0, 5);
      setFiles(updatedFiles);
      setContentImages(updatedFiles);
      setError(null);
    } else {
      setError('이미지 파일만 업로드할 수 있습니다.');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).filter(isImageFile);

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles].slice(0, 5);
      setFiles(updatedFiles);
      setContentImages(updatedFiles);
      setError(null);
    } else {
      setError('이미지 파일만 업로드할 수 있습니다.');
    }
  };

  return (
    <div className='w-full'>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-c4 p-6 transition hover:border-blue-primary ${
          files.length >= 5 ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        <input
          type='file'
          onChange={handleFileSelect}
          className='hidden'
          id='fileInput'
          multiple
          disabled={files.length >= 5}
          accept='image/*'
        />
        <label htmlFor='fileInput' className='cursor-pointer'>
          <span>상세내용 업로드할 이미지파일 놓기 또는 파일 선택 (최대 5개)</span>
        </label>
      </div>
      {error && <p className='mt-2 text-red'>{error}</p>}
      <div className='my-4'>
        {files.length > 0 && (
          <div>
            {files.map((file, index) => (
              <div key={index} className='mt-2 flex items-center justify-between rounded-lg border border-gray-c4 p-4'>
                <span>{file.name}</span>
                <button
                  className='text-gray-75 hover:text-red hover:underline'
                  onClick={() => {
                    const updatedFiles = files.filter((_, i) => i !== index);
                    setFiles(updatedFiles);
                    setContentImages(updatedFiles); // 상위 컴포넌트에 업데이트된 파일 배열 전달
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
