import React, {useEffect, useState} from 'react';

import {Form, Icon, Input, List, Modal, message} from 'antd';
import axios from "axios";
import servicePath from '../config/apiUrl';

const Security = () => {

    const [visiable, setVisiable] = useState(false)
    const [origin, setOrigin] = useState()
    const [pwd, setPwd] = useState()
    const [confirmPwd, setConfirmPwd] = useState()
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    //获取会员数据
    const checkLogin = () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if (localStorage.getItem('token') != null) {
            axios({
                method: 'get',
                url: servicePath.getUserInfo,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                withCredentials: false,
                cancelToken: source.token,
                transformResponse: function (data) {
                    if (data.indexOf('errors') != -1) {
                        data = JSON.parse(data);
                        for (var item in data.errors) {
                            message.error(data.errors[item][0]);
                        }
                    } else if (data.indexOf('Unauthenticated') != -1) {
                        localStorage.removeItem('token')
                        return data;
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    source.cancel('方法被取消');
                    setIsLoading(false)
                    res.data = eval('(' + res.data + ')');
                    setUser(res.data.data);
                }
            ).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('asasdas3')
        }
    }

    const getData = () => [
        {
            title: '账户密码',
            description: '修改密码需要提供原来的密码',
            actions: [
                <a key="Modify">
                    修改
                </a>,
            ],
        }
    ];

    const showModel = () =>{
        setVisiable(true)
    }

    useEffect(() => {
        if (isLoading) {
            checkLogin()
        }
    })



    const data = getData();

    const handleCancel = () => {
        setVisiable(false)
    };

    const handleOk = () =>{
        let dataProps = {}
        dataProps.origin = origin;
        dataProps.pwd = pwd;
        dataProps.confirm_pwd=confirmPwd
        dataProps.user_id =user.id
        axios({
            method: 'post',
            url: servicePath.RepairPassword,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            data:dataProps,
        }).then(res => {
            console.log(res)
            message.success(res.data.msg)
            setVisiable(false)
        })
    }

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={item.actions} onClick={showModel}>
                        <List.Item.Meta title={item.title} description={item.description}/>
                    </List.Item>
                )}
            />

            <Modal
                title="修改密码"
                visible={visiable}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="原密码">
                        <Input.Password onChange={(e) => {
                            setOrigin(e.target.value)
                        }} value={origin} placeholder="请输入原密码"/>
                    </Form.Item>
                    <Form.Item label="新密码">
                        <Input.Password onChange={(e) => {
                            setPwd(e.target.value)
                        }} value={pwd} placeholder="请输入新密码,密码不能带特殊字符"/>
                    </Form.Item>
                    <Form.Item label="确认密码">
                        <Input.Password onChange={(e) => {
                            setConfirmPwd(e.target.value)
                        }} value={confirmPwd}  placeholder="请输入确认密码"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    );
}

export default Security