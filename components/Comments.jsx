import React, { useState, useEffect, createContext, useMemo } from 'react'
import { message, Icon, Comment, List, Tooltip } from 'antd'
import Editor from './Editor'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import Star from './Star'
import servicePath from '../config/apiUrl';
export const ParentIdContext = createContext({})
export const ItemContext = createContext()

const Comments = ({ articleId }) => {
    const [token, setToken] = useState()
    const [parentId, setParentId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [coms, setComs] = useState([])
    const [auth, setAuth] = useState()
    const handleCommentClick = (comment) => {
        if (comment.id === parentId) {
            setParentId(0);
            return;
        }
        setParentId(comment.id ? comment.id : 0);
    };

    const checkLogin = (token) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if (token != null) {
            axios({
                method: 'get',
                url: servicePath.getUserInfo,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                withCredentials: false,
                cancelToken: source.token,
                transformResponse: function (data) {
                    console.log(data)
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
                    console.log(res);
                    res.data = eval('(' + res.data + ')');
                    console.log(res);
                    setAuth(res.data.data);
                }

            ).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('asasdas1')
        }
    };



    const getcomments = () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getArticleDetail + articleId + '/replies',
            withCredentials: false,
            cancelToken: source.token,
        }).then(
            res => {
                source.cancel('方法被取消');
                setIsLoading(false);
                setComs(res.data.data)
            }
        ).catch(function (error) {
            message.error(error.status)
        });
    }

    const login =useMemo(()=>checkLogin(token),[token])

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        if (isLoading) {
            {login}
            getcomments()
        }
    },[])


    const loop = (data) => data.map((item) => {
        const index = item.all_children;
        const content = (index && index.length > 0) ? (
            item.parent_id == 0 ? (
                <div id={'#reply'+item.id}>
                    <Comment
                        actions={[<ItemContext.Provider value={item}><Star  auth={auth}/></ItemContext.Provider>, <span key="comment-basic-reply-to" onClick={() => handleCommentClick(item)}><Icon type="message" /> 回复</span>]}
                        author={item.user.name}
                        avatar={item.user.avatar}
                        content={
                            <ReactMarkdown
                                source={item.content}
                                escapeHtml={false}
                            />
                        }
                        datetime={item.created_at}
                    />
                    {item.id === parentId && <div style={{ width: '90%', margin: '0 auto' }}>
                        <ParentIdContext.Provider value={{ parentId, setParentId, auth,getcomments }}>
                            <Editor articleId={articleId}/>
                        </ParentIdContext.Provider>
                    </div>}
                    {loop(item.all_children)}
                </div>) : (
                    <div id={'#reply'+item.id} style={{ width: '90%', margin: '0 auto', backgroundColor: '#f0f0f0', paddingLeft: 10, paddingRight: 10, position: 'relative', top: -15, borderRadius: 4 }}>
                        <Comment
                            actions={[<ItemContext.Provider value={item}><Star  auth={auth}/></ItemContext.Provider>, <span key="comment-basic-reply-to" onClick={() => handleCommentClick(item)}><Icon type="message" /> 回复</span>]}
                            author={item.user.name}
                            avatar={item.user.avatar}
                            content={
                                <ReactMarkdown
                                    source={item.content}
                                    escapeHtml={false}
                                />
                            }
                            datetime={item.created_at}
                        />
                        {item.id === parentId && <div style={{ width: '90%', margin: '0 auto' }}>
                            <ParentIdContext.Provider value={{ parentId, setParentId, auth,getcomments }}>
                                <Editor articleId={articleId}/>
                            </ParentIdContext.Provider>
                        </div>}
                        {loop(item.all_children)}
                    </div>
                )
        ) : (
                item.parent_id == 0 ? (
                    <div id={'#reply'+item.id}>
                        <Comment
                            actions={[<ItemContext.Provider value={item}><Star  auth={auth}/></ItemContext.Provider>, <span key="comment-basic-reply-to" onClick={() => handleCommentClick(item)}><Icon type="message" /> 回复</span>]}
                            author={item.user.name}
                            avatar={item.user.avatar}
                            content={
                                <ReactMarkdown
                                    source={item.content}
                                    escapeHtml={false}
                                />
                            }
                            datetime={item.created_at}
                        />
                        {item.id === parentId && <div style={{ width: '90%', margin: '0 auto' }}>
                            <ParentIdContext.Provider value={{ parentId, setParentId, auth, getcomments }}>
                                <Editor articleId={articleId}/>
                            </ParentIdContext.Provider>
                        </div>}
                    </div>
                ) : (
                        <div id={'#reply'+item.id} style={{ width: '90%',backgroundColor: '#f0f0f0', margin: '0 auto',paddingLeft: 10, paddingRight: 10, position: 'relative', top: -15, borderRadius: 4}}>
                            <Comment
                                actions={[<ItemContext.Provider value={item}><Star auth={auth}/></ItemContext.Provider>, <span key="comment-basic-reply-to" onClick={() => handleCommentClick(item)}><Icon type="message" /> 回复</span>]}
                                author={item.user.name}
                                avatar={item.user.avatar}
                                content={
                                    <ReactMarkdown
                                        source={item.content}
                                        escapeHtml={false}
                                    />
                                }
                                datetime={item.created_at}
                            />
                            {item.id === parentId && <div style={{ width: '90%', margin: '0 auto' }}>
                                <ParentIdContext.Provider value={{ parentId, setParentId, auth, getcomments }}>
                                    <Editor articleId={articleId}/>
                                </ParentIdContext.Provider>
                            </div>}
                        </div>)
            );
        return <div key={item.id} >{content}</div>;
    });


    return (
        <div>
            <ParentIdContext.Provider value={{ parentId, setParentId, auth, getcomments }}>
                <Editor articleId={articleId} />
            </ParentIdContext.Provider>
            {loop(coms)}
        </div>
    )
};

export default Comments