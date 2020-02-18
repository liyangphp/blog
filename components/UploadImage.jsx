import React, { useState, useEffect, memo, useContext } from 'react'
import {Upload, Icon, message } from 'antd'
import servicePath from '../config/apiUrl';
import { FmtContext } from '../pages/create'
const { Dragger } = Upload;
const UploadImage = memo(() => {
    let {fmt, setFmt} = useContext(FmtContext)
    const prop = {
        uid: '-2',
        name: 'upload_file',
        multiple: false,
        action: servicePath.uploadImage,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        onChange(info) {
            const { status } = info.file;
            console.log(status)
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            console.log(info)
            if (status === 'done') {
                message.success(`${info.file.name} 上传成功.`);
                setFmt(info.fileList[0].response.file_path)
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败.`);
            }
        },
    };

    return (
        <Dragger {...prop}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽上传封面</p>
        </Dragger>
    )
})

export default UploadImage