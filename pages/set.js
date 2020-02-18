import React, { useEffect, useState } from 'react'
import { Layout, Menu, message, Row } from 'antd';
import BaseView from '../components/BaseView'
import Security from '../components/Security'
import axios from "axios";
import Router from 'next/router'
import BindingView from "../components/BindingView";
import servicePath from '../config/apiUrl';
import NoticeView from '../components/NoticeView';
const { Content } = Layout;
const { Item } = Menu;

const Set = () => {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const menuMap = {
        base: "基本设置",
        security: "安全设置",
        binding: "账号绑定",
        notification: "消息通知",
    };

    //获取会员数据
    const checkLogin = (token) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if (token) {
            axios({
                method: 'get',
                url: servicePath.getUserInfo,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                withCredentials: false,
                cancelToken: source.token,
                transformResponse: function (data) {
                    console.log('data', data)
                    if (data.indexOf('errors') != -1) {
                        data = JSON.parse(data);
                        for (var item in data.errors) {
                            message.error(data.errors[item][0]);
                        }
                    } else if (data.indexOf('Unauthenticated') != -1) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user_id')
                        message.error('登录已过期，请重新登录');
                        Router.push('/login')
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    source.cancel('方法被取消');
                    setIsLoading(false)
                    console.log('user123', res.data)
                    res.data = eval('(' + res.data + ')');
                    console.log('user1', res.data.data)
                    if (!localStorage.getItem('user_id') || localStorage.getItem('user_id') != res.data.data.id) {
                        Router.push('/login');
                    } else {
                        setUser(res.data.data);
                    }

                }
            ).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('asasdas3')
        }
    }


    const mode = 'inline';

    const [selectKey, setSelectKey] = useState('base');

    const getRightTitle = () => {
        return menuMap[selectKey];
    };

    const renderChildren = () => {
        switch (selectKey) {
            case 'base':
                return <BaseView />;
            case 'security':
                return <Security />;
            case 'binding':
                return <BindingView />;
            case 'notification':
                return <NoticeView />;
            default:
                break;
        }
        return null;
    };

    const getMenu = () => {
        return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkLogin(localStorage.getItem('token'))
        } else {
            Router.push('/login')
        }
    },[])


    return (
        <Content className="main" style={{ margin: '2rem auto' }}>
            <div className="leftMenu">
                <Menu
                    mode={mode}
                    selectedKeys={[selectKey]}
                    onClick={({ key }) => setSelectKey(key)}>
                    {getMenu()}
                </Menu>
            </div>
            <div className="right">
                <div className="title">{getRightTitle()}</div>
                {renderChildren()}
            </div>
        </Content>
    )
}


export default Set
