import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Icon } from 'antd'
import Router from 'next/router'
import { withRouter} from 'next/router'
import servicePath from '../config/apiUrl';


const ArticleList = ({keywords,labels}) => {
    const [listData, setListData ]= useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [total, setTotal] = useState(0)
    const [dataLoading, setDataLoading] = useState(true)
    const getArticles = (page, label, keywords) => {
        console.log('keywords', keywords)
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        let dataProps='?category_id=1';
        dataProps+='&pageSize='+pageSize;
        dataProps+='&page='+page;

        if(keywords!=''){
            dataProps+='&q='+keywords
        }
    
        if(label !== ''){
            dataProps+='&biaoqian='+label
        }

        axios({
            method: 'get',
            url: servicePath.getArticleList+dataProps,
            cancelToken: source.token,
        }).then(
            res => {
                setDataLoading(false)
                source.cancel('方法被取消');
                for(let item in res.data.data){
                    res.data.data[item].biaoqian=res.data.data[item].biaoqian.split(",");
                    res.data.data[item].labes = res.data.data[item].biaoqian[0];
                    res.data.data[item].href="/detail?id="+res.data.data[item].id
                }
                setListData(res.data.data)
                setTotal(res.data.meta.total)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }



    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    );

    useEffect(() => {
            getArticles(page, labels,  keywords)
    },[page, labels,  keywords])

    return (
        <List className="list"
            loading = {dataLoading}
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    setPage(page)
                    getArticles(page)
                },
                pageSize: pageSize,
                total: total
            }}
            dataSource={listData}
            renderItem={item => (
                <List.Item className="list-item1" onClick={() => { Router.push({pathname:'/detail',query:{id:item.id},},'/detail/'+item.id)  }} 
                    key={item.title}
                    actions={[
                        <IconText type="fire" text={item.watches} key="list-vertical-fire" />,
                        <IconText type="like-o" text={item.stars} key="list-vertical-like-o" />,
                        <IconText type="message" text={item.replies.length} key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            className="img"
                            alt={item.title}
                            src={item.fmt}
                        />
                    }
                >
                    <List.Item.Meta style={{ marginTop: 42 }}
                        title={<a>{item.title}</a>}
                        description={<div className="remark">
                            <img className="avatar" style={{ borderRadius: '50%' }} src={item.user.avatar} />
                            <div className="member">{item.user.name}</div>
                            <div className="title">发布时间</div>
                            <div className="time">{item.created_at}</div>
                        </div>}
                    />
                    <div className="classifybox">
                        <div className="classify">{item.labes}</div>
                    </div>


                    <div className="neirong">
                        {item.content}
                    </div>

                </List.Item>
            )}
        />
    )
}

export default withRouter(ArticleList)