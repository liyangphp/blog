import React, { useState, useContext, useEffect } from 'react'
import {Icon, Button, Upload, Avatar, Form, Input, message, Comment, Tooltip} from 'antd'
import axios from 'axios'
import {ItemContext, ParentIdContext} from './Comments'
import servicePath from '../config/apiUrl';
const { TextArea } = Input;



const Editor = ({articleId}) => {
    const [submitting, setSubmitting] = useState(false)
    const [token, setToken] = useState()
    const [value, setValue] = useState('')
    let {parentId, setParentId, auth, getcomments} = useContext(ParentIdContext)

    const handleChange = e => {        
        setValue(e.target.value)
    };





    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true)
        setTimeout(() => {
            axios({
                method: 'post',
                url: servicePath.getArticleDetail + articleId + '/replies',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    parent_id: parentId,
                    rcontent: value
                },
                withCredentials: false,
            }).then(
                res => {
                    console.log(res)
                    setSubmitting(false)
                    setValue('');
                    setParentId(0)
                    getcomments()
                }
            ).catch(function (error) {
                console.log(error)
                message.error(error.status)
            });

        }, 1000);
    };

    const handleUploadChange = ({ file }) => {
        let newValue = '';
        console.log(file)
        switch (file.status) {
            case 'done':
                message.destroy();
                message.success('上传成功！');
                // @ts-ignore
                newValue = value + `![file](${file.response.file_path})`;
                setValue(newValue)
                break;
            case 'error':
                message.destroy();
                message.error(file.response.message);
                break;
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    },[])



    return (
        <div className="editor">
            <Form.Item>
                <TextArea rows={4} onChange={handleChange} value={value} />
            </Form.Item>
            <Form.Item>
                <div className="toolbar">
                    <div className="info">
                        {
                            auth ?
                                (
                                    <div>
                                        <Avatar
                                            className="avatar"
                                            src={auth.avatar}
                                            alt={auth.name}
                                            icon="user"
                                        />
                                        <div style={{ paddingLeft: 10, display: 'inline-block' }}>{auth.name}</div>
                                    </div>
                                ) :
                                (
                                    <div>您需要 <a>登录</a> 才能发表评论</div>
                                )
                        }
                    </div>
                    <div className="actionss">
                        <div className="action">
                            <Upload
                                accept="image/*"
                                name="file"
                                className="upload"
                                action= {servicePath.uploadArticleImage}
                                showUploadList={false}
                                headers={{ Authorization: 'Bearer ' + token }}
                                onChange={handleUploadChange}
                            >
                                <Icon type="picture" />
                            </Upload>
                        </div>
                        <div className="action">
                            <Button
                                htmlType="submit"
                                loading={submitting}
                                onClick={handleSubmit}
                                disabled={!auth}
                                type="primary"
                                icon="message"
                            >
                                评论
                        </Button>
                        </div>
                    </div>
                </div>
            </Form.Item>
            </div>

    )
}

export default Editor