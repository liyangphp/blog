import React, { useState, useEffect } from 'react'
import { Avatar, Card, Col, Divider, Icon, Layout, message, Row, Tag } from 'antd';
import axios from "axios";
import UserCodeList from '../components/UserCodeList'
import UserArticleList from '../components/UserArticleList'
import servicePath from '../config/apiUrl';
import '../public/style/center.css'

const { Content } = Layout;

const Center = (props) => {
    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [dataLoading, setDataLoading] = useState(true)
    const [tabKey, setTabKey] = useState("articles")
    const [data, setData] = useState([])
    const [third, setThird] = useState()
    const [articleCount, setArticleCount] = useState(0)
    const [projectCount, setProjectCount] = useState(0)
    const [address, setAddress] = useState([])
    const [tags, setTags] = useState([])
    const [addr, setAddr] = useState()
    const onTabChange = (key) => {
        setTabKey(key)
        getList(props.id, key)
    };
    const operationTabList = [
        {
            key: 'articles',
            tab: (
                <span>
                    文章 <span style={{ fontSize: 14 }}>({articleCount})</span>
                </span>
            ),
        },
        {
            key: 'applications',
            tab: (
                <span>
                    源码 <span style={{ fontSize: 14 }}>({projectCount})</span>
                </span>
            ),
        }
    ];

    const renderChildrenByTabKey = (tabKey) => {
        if (tabKey === 'applications') {
            return <UserCodeList userId={props.id} />;

        }
        if (tabKey === 'articles') {
            return <UserArticleList userId={props.id} />;
        }
        return null;
    };

    //获取用户第三方信息
    const getThird = (id) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getThird + '?user_id=' + id,
            withCredentials: false,
            cancelToken: source.token,
        }).then(
            res => {
                source.cancel('方法被取消');
                setArticleCount(res.data.data ? res.data.data.article_count : 0)

                setProjectCount(res.data.data ? res.data.data.project_count : 0)

                setThird(res.data.data)

                setTags(res.data.data.tags.split(","))

                getName(res.data.data.province_id)

                getName(res.data.data.city_id)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    //获取地名
    const getName = (id) => {
        axios({
            method: 'get',
            url: servicePath.getAddressName + '?id=' + id,
            withCredentials: false,
        }).then(
            res => {
                console.log(res)
                let arr = address;
                if (arr.indexOf(res.data.data.name) == -1) {
                    arr.push(res.data.data.name)
                }

                setAddress(arr)

                setAddr(address.join(' '))
            }
        );
    }

    //获取用户的文章，源码
    const getList = (id, tabKey) => {
        let category_id = 1;
        if (tabKey === "articles") {
            category_id = 1
        } else {
            category_id = 4
        }
        console.log('tabkey', tabKey)
        axios({
            method: 'get',
            url: servicePath.getUserArticle + '?user_id=' + props.id + '&category_id=' + category_id,
            withCredentials: false,
        }).then(
            res => {
                console.log(res)
                setIsLoading(false)
                setDataLoading(false)
                for (let item in res.data.data) {
                    res.data.data[item].biaoqian = res.data.data[item].biaoqian.split(",");
                    res.data.data[item].labes = [];
                    res.data.data[item].href = "/detail?id=" + res.data.data[item].id
                    for (let i = 0; i < res.data.data[item].biaoqian.length; i++) {
                        res.data.data[item].labes.push(<Tag key={i}
                            size="small">{res.data.data[item].biaoqian[i]}</Tag>)
                    }
                }

                getThird(id)
                setData(res.data.data)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }


    useEffect(() => {
        if (isLoading) {
            getList(props.id, tabKey)
            //getThird(props.id)
        }
    }, [])
    return (
        <Content style={{ padding: '0 1rem', margin: '1rem auto' }}>
            <Row gutter={24}>
                <Col lg={7} md={24}>
                    <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
                        {!dataLoading && (
                            <div>
                                <div className="avatarHolder">
                                    <img alt="" src={props.avatar} />
                                    <div className="name">{props.name}</div>
                                    <div>{props.introduction}</div>
                                </div>
                                {third && <div className="detail">
                                    <p>
                                        <Icon type="deployment-unit" />
                                        <span>{third.professional}</span>
                                    </p>
                                    <p>
                                        <Icon type="apartment" />
                                        <span>{third.company}</span>
                                    </p>
                                    <p>
                                        <Icon type="environment" />
                                        <span>{addr}</span>
                                    </p>
                                </div>}
                                {third && <Divider dashed />}
                                {third && <div>
                                    <div style={{ marginBottom: 12, color: "rgba(0,0,0,0.85)" }}>标签</div>
                                    <div style={{ lineHeight: '30px' }}>
                                        {tags && tags.map(item => (<Tag key={item}>{item}</Tag>))}
                                    </div>
                                </div>}

                                {third && <Divider style={{ marginTop: 26 }} dashed />}
                                {third && <div className="team">
                                    <div style={{ marginBottom: 12, color: "rgba(0,0,0,0.85)" }}>社交账号</div>
                                    <Row gutter={36}>
                                        <Col lg={8} xl={8} className="sjitem">
                                            <Avatar size={28} icon="github" className="account" />
                                            <div className="mz">github</div>
                                        </Col>
                                        <Col lg={8} xl={8} className="sjitem">
                                            <Avatar size={28} icon="qq" className="account" />
                                            <div className="mz">QQ</div>
                                        </Col>
                                        <Col lg={8} xl={8} className="sjitem">
                                            <Avatar size={28} icon="wechat" className="account" />
                                            <div className="mz">微信</div>
                                        </Col>
                                    </Row>

                                </div>}
                            </div>
                        )}
                    </Card>
                </Col>
                <Col lg={17} md={24}>
                    <Card
                        className="tabsCard"
                        bordered={false}
                        tabList={operationTabList}
                        activeTabKey={tabKey}
                        onTabChange={onTabChange}>
                        {renderChildrenByTabKey(tabKey)}
                    </Card>
                </Col>
            </Row>
        </Content>
    )
}

Center.getInitialProps = async (context) => {
    console.log('context', context)
    let id = context.ctx.query.user_id
    const promise = new Promise((resolve) => {
        axios(servicePath.getUser + id).then(
            (res) => {
                console.log('user1', res)
                resolve(res.data.data)
            }
        )
    })

    return await promise
}

export default Center