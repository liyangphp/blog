import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Icon } from 'antd'
import Router from 'next/router'
import servicePath from '../config/apiUrl';



const TeachList = ({keywords,labels}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [total, setTotal] = useState(0)
    const [listData, setListData] = useState([]);
    const getArticles = (page, labels, keywords) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        let dataProps = '?category_id=3';
        dataProps += '&pageSize=' + pageSize;
        dataProps += '&page=' + page;
        if (keywords != '') {
            dataProps += '&q=' + keywords
        }

        if (labels != '') {
            dataProps += '&biaoqian=' + labels
        }
        axios({
            method: 'get',
            url: servicePath.getArticleList + dataProps,
            cancelToken: source.token,
        }).then(
            res => {
                setIsLoading(false)
                console.log(res.data.data)
                source.cancel('方法被取消');
                for (let item in res.data.data) {
                    res.data.data[item].biaoqian = res.data.data[item].biaoqian.split(",");
                    res.data.data[item].labes = res.data.data[item].biaoqian[0];
                    res.data.data[item].href = "/detail?id=" + res.data.data[item].id

                }
                setListData(res.data.data)
                setTotal(res.data.meta.total)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
            getArticles(page, labels, keywords)
    },[page, labels, keywords])



    return (
        <>
            <List style={{ margin: '0 auto' }}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item key={item.title} className="list-item" style={{ position: 'relative', cursor: 'pointer',    padding: '0px 0 !important', borderBottom:'none' }} onClick={() => { window.location.href = item.href }}>
                        <List.Item.Meta style={{ alignItems: 'stretch', backgroundColor: '#fff', marginTop: '1rem', borderBottom: 'none', borderRadius: 10, padding: 32, flexWrap:'wrap'}} onClick={() => { window.location.href = item.href }}
                            avatar={<div className="img"><img
                                width={'182px'}
                                style={{paddingRight:10}}
                                alt="logo"
                                src={item.fmt}
                            /></div>}
                            title={<a href={item.href}>{item.title}</a>}
                            description={<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 5 , height:'100%'}}>
                                <div className="txt">
                                    <div className="con" dangerouslySetInnerHTML={{ __html: item.desc }} />
                                </div>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="remark">
                                        <img style={{ borderRadius: '50%' }} src={item.user.avatar} />
                                        <div className="member">{item.user.name}</div>
                                        <div className="title">发布时间</div>
                                        <div className="time">{item.created_at}</div>
                                    </div>
                                    <a className="see-more">查看课程</a>
                                </div>
                            </div>}
                        />

                        <div className="classifybox">
                            <div className="classify">{item.labes}</div>
                        </div>

                    </List.Item>
                )}
            />
        </>
    )
}

export default TeachList