import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { Layout, Row, Col, Icon, Affix, BackTop, Tag, Button, message } from 'antd';
import servicePath from '../config/apiUrl';
import User from '../components/User'
import axios from 'axios'
import marked from 'marked'
import Router from 'next/router'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import 'markdown-navbar/dist/navbar.css';
import Tocify from '../components/tocify.tsx'
import Comments from '../components/Comments'

import { withRouter } from 'next/router'


const { Content } = Layout;
const Detail = (props) => {
    const [token, setToken] = useState()
    const [start, setStart] = useState()
    const [flag, setFlag] = useState(false)
    const [userId, setUserId] = useState()
    const renderer = new marked.Renderer();
    const tocify = new Tocify()
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    const editArticle = () => {
        Router.push('/create?id=' + props.id)
    }

    const deleteArticle = () => {
        console.log('asasd')
    }


    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    console.log(unescape(props.content))
    let html = marked(unescape(props.content))

    const haslike = (id) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.hasLike + '?user_id=' + id + '&article_id=' + props.id + '&reply_id=0',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: false,
            cancelToken: source.token,
        }).then(
            res => {
                source.cancel('方法被取消');
                if (res.data.data.id) {
                    setFlag(true)
                } else {
                    setFlag(false)
                }
            }
        ).catch(function (error) {
            console.log(error)
        });
    };

    const like = () => {
        let dataProps = {}
        dataProps.article_id = props.id;
        dataProps.user_id = userId;
        dataProps.reply_id = 0;
        axios({
            method: 'post',
            url: servicePath.giveLike,
            data: dataProps,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: false,
        }).then(
            res => {
                haslike(userId)
                if (res.status == 204) {
                    let number = start - 1;
                    setStart(number);
                } else {
                    let number = start + 1;
                    setStart(number);
                }

            }
        ).catch(function (error) {
            console.log('err', error)
            // message.error(error)
        });
    };



    useEffect(() => {
        setFlag(props.likes && props.likes.user_id == localStorage.getItem('user_id'))
        setToken(localStorage.getItem('token'))
        setUserId(localStorage.getItem('user_id'))
    }, [])

    return (
        <Layout>
            <Head>
                <title>博人堂-{props.title}</title>
                <meta name="description" content={props.title} />
                <meta name="keywords" content={props.title} />
            </Head>

            <Content className="content">
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={19} xl={19}>
                        <div className="comm-left">
                            <div className="detailed-title">
                                {props.title}
                            </div>

                            <div className="list-icon">
                                <span><Icon type="calendar" /> {props.created_at}</span>
                                <span><Icon type="folder" /> {props.category.category_name}</span>
                                <span><Icon type="fire" /> {props.watches}人</span>
                            </div>

                            <div className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: html }}   >
                            </div>

                            {props.category.category_name == "源码"  && <div style={{margin:'20px auto',width:'96%'}}>
                                <Icon type="ant-cloud" style={{textAlign:"right",marginRight:10}}/> <span style={{marginRight:10}}>{props.baiduyu_url}</span><span>{props.baiduyu_pwd}</span>
                            </div>}

                            <div className="tags" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: '10px 20px' }}>
                                <div>
                                    <Icon type="tags" theme="filled" style={{ marginRight: 12, fontSize: 16 }} />
                                    {
                                        props.tags &&
                                        props.tags.map(tag => (
                                            <Tag key={tag} color="orange">{tag}</Tag>
                                        ))
                                    }
                                </div>

                                {props && props.user.id == userId && <div><Button onClick={editArticle} type="dashed" icon="edit" style={{ textAlign: "right", marginRight: 10 }}>
                                    编辑</Button>

                                    <Button onClick={deleteArticle} type="dashed" icon="bank" style={{ textAlign: "right" }}>
                                        删除</Button></div>}
                            </div>
                            {userId && <div className="actions">
                                {flag ? <Button onClick={like}
                                    type="primary"
                                    shape="circle"
                                    icon="like-o" /> : <Button onClick={like}
                                        type="dashed"
                                        shape="circle"
                                        style={{ marginRight: 10 }}
                                        icon="like-o" />}
                            </div>}

                            <div className="comment">
                                <Comments articleId={props.id} />
                            </div>
                        </div>






                    </Col>
                    <Col xs={0} sm={0} md={0} lg={5} xl={5}>
                        <User user={props.user} />
                        {props.category.category_name == "教程" && <Affix style={{ marginTop: 20 }} offsetTop={0}>
                            <div className="detailed-nav comm-box1">
                                <div className="toc-list">
                                    {tocify && tocify.render()}
                                </div>
                            </div>
                        </Affix>}
                    </Col>
                </Row>
            </Content>
            <BackTop />

        </Layout>
    )
}

Detail.getInitialProps = async (context) => {
    console.log('context', context)
    let id = context.ctx.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleDetail + id).then(
            (res) => {
                resolve(res.data.data)
            }
        )
    })

    return await promise
}



export default withRouter(Detail)