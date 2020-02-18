import React, { useState, useEffect } from 'react'
import { List, Card, Icon, Avatar } from 'antd'
import axios from 'axios'
import dynamic from 'next/dynamic'
import servicePath from '../config/apiUrl';

const Ellipsis = dynamic(
    import ("ant-design-pro/lib/Ellipsis") ,
    {
      ssr: false   //这个要加上,禁止使用 SSR
    }
)


const ResCommand = () => {
    const [list, setList] = useState()
    const getLastArticle = () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getRecommandList+'?category_id=4',
            cancelToken: source.token,
        }).then(
            res => {
                
                console.log(res.data.data)
                source.cancel('方法被取消');
                for (let item in res.data.data) {
                    res.data.data[item].href = "/detail?id=" + res.data.data[item].id
                }
                setList(res.data.data)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
        getLastArticle()
    },[])

    return (
        <Card size="small" extra={<a style={{ color: '#000' }} href="#"><Icon type="ellipsis" /></a>} title={<div style={{
            width: '100%',
            textAlign: 'left'
        }}>
            <Icon type="share-alt" />
            <span style={{ marginLeft: 10 }}>最新分享</span>
        </div>} style={{ margin: '1rem 1rem 0.5rem 1rem', borderRadius: '0.3rem' }}>
            <List
                dataSource={list}
                renderItem={item => (
                    <List.Item key={item.id} className="re-item" style={{ margin: '10px auto', borderBottom:'none' }}>
                        <List.Item.Meta
                            avatar={
                                <Avatar style={{ borderRadius: '25%' }} src={item.fmt} />
                            }
                            title={<Ellipsis lines={2} tooltip><a style={{ position: "relative", color: "#000", fontSize: '0.4rem', lineHeight: 0.1 }} href={item.href}>{item.title}</a></Ellipsis>}
                        />
                        <div style={{ color: '#98a6ad', fontSize: '8px' }}>
                            文件：{item.count}
                        </div>
                    </List.Item>
                )}>
            </List>
        </Card>
    )
}

export default ResCommand