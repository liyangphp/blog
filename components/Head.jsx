import React, { useState, useEffect, memo, useMemo, useCallback } from 'react'
import { Layout, Row, Col, Menu, Icon, Button, Dropdown, Avatar, message } from 'antd';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { connect } from 'react-redux'

import servicePath from '../config/apiUrl';

const { Header } = Layout;

const Head = (props) => {
    console.log('props', props.current)
    const [data, setData] = useState([])
    const [listData, setListData] = useState([]);
    const [unreadCount, setUnreadCount] = useState()
    const [current, setCurrent] = useState()
    const [subkey, setSubkey] = useState()
    const [categories, setCategories] = useState([])
    const [mcategories, setMcategories] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [auth, setAuth] = useState()
    const [collapsed, setCollapsed] = useState(false)
    const handleClick = e => {
        props.update_labels("")
        props.update_keywords("")
        setCurrent(e.key)
        props.update(e.key)
        console.log('current: ', e)
    }

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

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
                    console.log('user', data)
                    if (data.indexOf('errors') != -1) {
                        data = JSON.parse(data);
                        for (var item in data.errors) {
                            message.error(data.errors[item][0]);
                        }
                    } else if (data.indexOf('Unauthenticated') != -1) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user_id')
                        message.error('登录已过期，请重新登录');
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    source.cancel('方法被取消');
                    setDataLoading(false)
                    console.log('user', res.data)
                    res.data = eval('(' + res.data + ')');
                    setAuth(res.data.data);
                    localStorage.setItem('user_id', res.data.data.id)
                    getNotification()
                    getNoread()
                }
            ).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('asasdas2')
        }
    }

    const onMenuClick = e => {
        if (e.key == 'logout') {
            axios({
                method: 'delete',
                url: servicePath.Logout,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                withCredentials: false,
            }).then(
                res => {
                    window.location.href = "/login"
                }
            ).catch(function (error) {
                console.log(error)
            });

        }

        if (e.key == 'center') {
            Router.push("/center?user_id=" + auth.id)
        }

        if (e.key == 'settings') {
            window.location.href = "/set"
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
            console.log(res)
            setData(res.data.data);
        }
        )
    }

    const onClear = (tabTitle) => {
        axios({
            method: 'patch',
            url: servicePath.getNotificationStatus,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            transformResponse: function (data) {
                console.log(data)
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const getNoticeData = (notices) => {
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return newNotices.reduce((pre, data) => {
            if (!pre[data.type]) {
                pre[data.type] = [];
            }
            pre[data.type].push(data);
            return pre;
        }, {});
    }

    const getNoread = () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getNotificationStatus,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            cancelToken: source.token,
            transformResponse: function (data) {
                source.cancel('方法被取消');
                data = eval('(' + data + ')');
                console.log('123', data)
                setUnreadCount(data.unread_count)
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const noticeData = getNoticeData(data);

    const onItemClick = (item, tabProps) => {
        console.log('item', item)
        axios({
            method: 'patch',
            url: servicePath.getNotificationStatus,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            transformResponse: function (data) {
                console.log('article_link', data)
            }
        }).catch(function (error) {
            console.log(error)
        });
        Router.push(item.data['article_link']);
    }

    const menu = (
        <Menu onClick={onMenuClick} selectedKeys={subkey}>
            <Menu.Item key="center">
                <Icon type="user" />
                <span>个人中心</span>
            </Menu.Item>
            <Menu.Item key="settings">
                <Icon type="setting" />
                <span>个人设置</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <Icon type="logout" />
                <span>退出登录</span>
            </Menu.Item>
        </Menu>
    );

    const mobilemenu = (
        <Menu
            className={'show'}
            theme="white"
            mode="inline"
            loading={dataLoading + ""}
            onClick={handleClick}
            selectedKeys={current}>
            {categories}
            {auth && auth.id ? (
                <Menu.Item key="center">
                    <Link href={{ pathname: '/center', query: { user_id: auth.id } }}>
                        <a>
                            <Icon type="user" />
                            <span>我的</span>
                        </a>
                    </Link>
                </Menu.Item>
            ) : (<Menu.Item key="login">
                <Link href="/login">
                    <a>
                        <Icon type="user" />
                        <span>登录</span>
                    </a>
                </Link>
            </Menu.Item>)}

            {auth && auth.id ? (
                <Menu.Item key="settings">
                    <Link href="/set">
                        <a>
                            <Icon type="setting" />
                            <span>设置</span>
                        </a>
                    </Link>
                </Menu.Item>
            ) : (<></>)}

            {auth && auth.id ? (
                <Menu.Item key="logout">
                    <Link href="/logout">
                        <a>
                            <Icon type="logout" />
                            <span>退出</span>
                        </a>
                    </Link>
                </Menu.Item>
            ) : (<></>)}

            <Menu.Item key="create">
                <Link href="/create">
                    <a>
                        <Icon type="edit" />
                        <span>写作</span>
                    </a>
                </Link>
            </Menu.Item>
        </Menu>
    );

    const getcategory = useCallback(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getCategories,
            cancelToken: source.token,
        }).then(
            res => {
                source.cancel('方法被取消');
                let str = [];
                for (let i = 0; i < res.data.length; i++) {
                    str.push(<Menu.Item key={res.data[i].id}>
                        <Link href={res.data[i].href_value}>
                            <a>
                                <Icon type={res.data[i].icon} />
                                <span>{res.data[i].category_name}</span>
                            </a>
                        </Link>
                    </Menu.Item>)
                }
                setCategories(str)
                setDataLoading(false)
            }

        ).catch(function (error) {
            console.log(error)
        });
    }, [categories])

    useEffect(() => {
        checkLogin();
        if (dataLoading) {
            getcategory();
        }
    }, [categories])
    return (
        <>
            <Header className="la">
                <Row type="flex">
                    <Col xs={14} sm={15} md={18} lg={3} xl={3}>
                        <Link href="/">
                            <a>
                                <img className="logo" src={"../images/logo.png"} />
                            </a>
                        </Link>
                    </Col>
                    <Col className="memu-div" xs={0} sm={0} md={0} lg={9} xl={9}>
                        <Menu
                            className="menu"
                            theme="white"
                            mode="horizontal"
                            loading={dataLoading + ""}
                            onClick={handleClick}
                            selectedKeys={current}>
                            {categories}
                        </Menu>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={2} xl={2}>
                    </Col>
                    <Col className="text-right" xs={0} sm={0} md={0} lg={10} xl={10}>
                        <Menu className="menu-right"
                            theme="dark"
                            mode="horizontal"
                            onClick={handleClick}
                            className="menu">
                            <Menu.Item>
                                <HeaderSearch
                                    placeholder="站内搜索"
                                    dataSource={listData}
                                    onSearch={value => {
                                        console.log('value1', value)
                                        props.update_keywords(value)
                                    }}
                                    onPressEnter={value => {
                                        console.log('value2', value)
                                        props.update_keywords(value)
                                    }}
                                />
                            </Menu.Item>
                            <Menu.Item>
                                <NoticeIcon className="notice-icon" count={unreadCount} onItemClick={onItemClick} onClear={onClear}>
                                    <NoticeIcon.Tab
                                        list={noticeData.message}
                                        title="通知"
                                        emptyText="您已读完所有消息"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                                    />
                                    <NoticeIcon.Tab
                                        list={noticeData.notification}
                                        title="私信"
                                        emptyText="你已查看所有通知"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                                    />
                                    <NoticeIcon.Tab
                                        list={noticeData.event}
                                        title="系统"
                                        emptyText="你已完成所有待办"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                                    />
                                </NoticeIcon>
                            </Menu.Item>
                            <Menu.Item key="login">
                                {auth && auth.id ? (
                                    <Dropdown overlay={menu} placement="bottomLeft">
                                        <div>
                                            <Avatar
                                                className="user"
                                                size="small"
                                                src={auth.avatar}
                                                alt="avatar"
                                            />
                                            <span className="authname" style={{ marginLeft: 10, color: '#000' }}>{auth.name}</span>
                                        </div>
                                    </Dropdown>
                                ) : (<Link href="/login">
                                    <a>
                                        <Button shape="round" onClick={() => { Router.push('/login') }}>登陆</Button>
                                    </a>
                                </Link>)
                                }
                            </Menu.Item>
                            <Menu.Item key="create">
                                <Link href="/create">
                                    <a>
                                        <Button shape="round">写文章</Button>
                                    </a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col className="memu-div" style={{ textAlign: 'right' }} xs={10} sm={9} md={6} lg={0} xl={0}>
                        <Dropdown overlay={mobilemenu}>
                            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} ></Icon>
                            </Button>
                        </Dropdown>
                        {/* <Menu
                            className={collapsed ? 'show' : 'hidden'}
                            theme="white"
                            mode="inline"
                            loading={dataLoading + ""}
                            onClick={handleClick}
                            selectedKeys={current}>
                            {categories}
                            {auth && auth.id ? (
                                <Menu.Item key="center">
                                    <Link href={{pathname:'/center',query:{user_id:auth.id}}}>
                                        <a>
                                            <Icon type="user" />
                                            <span>我的</span>
                                        </a>
                                    </Link>
                                </Menu.Item>
                            ) : (<Menu.Item key="login">
                                <Link href="/login">
                                    <a>
                                        <Icon type="user" />
                                        <span>登录</span>
                                    </a>
                                </Link>
                            </Menu.Item>)}

                            {auth && auth.id ? (
                                <Menu.Item key="settings">
                                    <Link href="/set">
                                        <a>
                                            <Icon type="setting" />
                                            <span>设置</span>
                                        </a>
                                    </Link>
                                </Menu.Item>
                            ) : (<></>)}

                            {auth && auth.id ? (
                                <Menu.Item key="logout">
                                    <Link href="/logout">
                                        <a>
                                            <Icon type="logout" />
                                            <span>退出</span>
                                        </a>
                                    </Link>
                                </Menu.Item>
                            ) : (<></>)}

                            <Menu.Item key="create">
                                <Link href="/create">
                                    <a>
                                        <Icon type="edit" />
                                        <span>写作</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                        </Menu> */}
                    </Col>
                </Row>
            </Header>
        </>
    )
}



export default connect(
    function mapStateToProps(state) {
        return {
            current: state.current
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            update: (current) => dispatch({ type: 'UPDATE_CURRENT', current }),
            update_labels: (labels) => dispatch({ type: 'UPDATE_LABELS', labels }),
            update_keywords: (keywords) => dispatch({ type: 'UPDATE_KEYWORDS', keywords })
        }
    }
)(Head)