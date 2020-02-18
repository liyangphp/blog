import React, { useEffect, useState } from 'react';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Card, message, Icon, Comment, List } from 'antd';
import axios from "axios";
import servicePath from '../config/apiUrl';
import Router from 'next/router'

const NoticeView = () => {
    const [data, setData] = useState([])
    const [user, setUser] = useState()
    const [notifications, setNotifications] = useState(0)
    const [systems, setSystems] = useState(0)
    const [messages, setMessages] = useState(0)
    const [tabKey, setTabKey] = useState("notification")
    const onTabChange = (key) => {
        setTabKey(key)
        
    };

    const operationTabList = [
        {
            key: 'notification',
            tab: (
                <span>
                    通知 <span style={{ fontSize: 14 }}>({notifications})</span>
                </span>
            ),
        },
        {
            key: 'system',
            tab: (
                <span>
                    系统 <span style={{ fontSize: 14 }}>({systems})</span>
                </span>
            ),
        },
        {
            key: 'message',
            tab: (
                <span>
                    私信 <span style={{ fontSize: 14 }}>({messages})</span>
                </span>
            ),
        }
    ];

    const renderChildrenByTabKey = (tabKey) => {
        if (tabKey === 'notification') {
            return <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <li>
                        <Comment
                            onClick = {()=>{Router.push(item.data['article_link'])}}
                            author={item.name}
                            avatar={item.avatar}
                            content={item.description}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />;
        }

        if (tabKey === 'message') {
            return <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <li>
                    <Comment
                        onClick = {()=>{Router.push(item.data['article_link'])}}
                        author={item.name}
                        avatar={item.avatar}
                        content={item.description}
                        datetime={item.datetime}
                    />
                </li>
            )}
        />;
        }

        if (tabKey === 'system') {
            return <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <li>
                    <Comment
                        author={item.name}
                        avatar={item.avatar}
                        content={item.description}
                        datetime={item.datetime}
                    />
                </li>
            )}
        />;
        }
        return null;
    };
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
                        Router.push('/')
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    source.cancel('方法被取消');
                    res.data = eval('(' + res.data + ')');
                    console.log('res111',res)
                    setUser(res.data.data);
                    getNotification()
                }
            ).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('asasdas3')
        }
    }

    const getNotification = () => {
        axios({
            method: 'get',
            url: servicePath.getNotifications,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            withCredentials: false,
        }).then(res => {
            let count = 0
            let count1 = 0;
            let count2 = 0;
            for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].type === "notification") {
                    count++
                    console.log('count', count)
                }
                if (res.data.data[i].type === "system") {
                    count1++
                    console.log('count1', count1)
                }
                if (res.data.data[i].type === "message") {
                    count2++
                    console.log('count2', count2)
                }
            }
            setNotifications(count)
            setSystems(count1)
            setMessages(count2)
            setData(res.data.data);
        }
        )
    }







    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkLogin()
        } else {
            Router.push('/login')
        }
    }, [])

    return (
        <>
            <Card
                className="tabsCard"
                bordered={false}
                tabList={operationTabList}
                activeTabKey={tabKey}
                onTabChange={onTabChange}>
                {renderChildrenByTabKey(tabKey)}
            </Card>
        </>
    )
}

export default NoticeView