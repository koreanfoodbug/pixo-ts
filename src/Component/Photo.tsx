import React, { useState, useRef } from 'react';
import { StyledComponent } from 'styled-components';
import ReactLoading from 'react-loading';

interface Props {
    Empty: StyledComponent<'div', any>
    UploadArea: StyledComponent<'div', any>
}

const Photo: React.FC<Props> = ({ Empty, UploadArea }) => {
    const [file, setFile] = useState<string>();
    const [loading, setLoading] = useState<boolean>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setFile(e.target?.result as string);
            setLoading(false);
        }

        const fileList = e.currentTarget.files as FileList
        setLoading(true);
        reader.readAsDataURL(fileList[0]);
    }

    return (
        <>
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                accept="image/*"
                onChange={handleFile}
                type="file"
            />
            <UploadArea onClick={handleClick}>
                {loading && <ReactLoading type="cylon" color="black" />}
                {
                    file ? (
                        <img src={file} alt="upload area" width={172} height={216} style={{ objectFit: 'cover' }} />
                    ) : (
                        <Empty>Please upload <br /> image...</Empty>
                    )
                }
            </UploadArea>
        </>
    );
};

export default Photo;