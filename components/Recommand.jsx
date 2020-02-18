import React, { useState, useEffect } from 'react'
import {List, Card, Icon, Avatar } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl';
import dynamic from 'next/dynamic'
const Ellipsis = dynamic(
    import ("ant-design-pro/lib/Ellipsis") ,
    {
      ssr: false   //这个要加上,禁止使用 SSR
    }
)
const Recommand = () => {
    const [list, setList] = useState()
    const [dataLoading, setDataLoading] = useState(true)
    const getLastArticle = () =>{
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getRecommandList+'?category_id=1',
            cancelToken: source.token,
        }).then(
            res => {
                setDataLoading(false)
                console.log(res.data.data)
                source.cancel('方法被取消');
                for(let item in res.data.data){
                    res.data.data[item].href="/detail?id="+res.data.data[item].id
                }
                setList(res.data.data)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }


    useEffect(() => {
        if (dataLoading) {
            getLastArticle();
        }
    },[])


    return (
        <Card size="small" loading={dataLoading} className="recommand" extra={<a className="extra" href="#"><Icon type="ellipsis" /></a>} 
        title={<div className="title">
            <Icon type="share-alt" />
            <span>最新文章</span>
        </div>}>
            <List
                dataSource={list}
                renderItem={item => (
                    <List.Item className="re-item" key={item.id}>
                        <List.Item.Meta
                            avatar={
                                <Avatar style={{ borderRadius: '25%' }} src={item.fmt} />
                            }
                            title={<Ellipsis lines={2} tooltip><a className="btitle" href={item.href}>{item.title}</a></Ellipsis>}
                        />
                    </List.Item>
                )}>
            </List>
        </Card>
    )
}

export default Recommand