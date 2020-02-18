import React, { useEffect, useState } from 'react';
import { Icon, Card, Avatar, List } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl';
const { Meta } = Card;
const CodeList = ({ keywords, labels }) => {
    const [list, setList] = useState()
    const [listData, setListData] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const getArticles = (page, labels, keywords) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        let dataProps = '?category_id=4';
        dataProps += '&pageSize=' + pageSize;
        dataProps += '&page=' + page;
        if (labels != '') {
            dataProps += '&biaoqian=' + labels
        }

        if (keywords != '') {
            dataProps += '&q=' + keywords
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
                    res.data.data[item].href = "/detail?id=" + res.data.data[item].id

                }
                setListData(res.data.data)
                setTotal(res.data.meta.total)
                setPage(page)

            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
        getArticles(page, labels, keywords)
    }, [page, labels, keywords])

    return (
        <List className="list" style={{ marginTop: '1rem' }}
            grid={{ gutter: 12,       xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3, }}
            pagination={{
                onChange: page => {
                    getArticles(page, labels, keywords)
                },
                pageSize: pageSize,
                total: total
            }}
            dataSource={listData}
            renderItem={item => (
                <List.Item className="list-item">
                    <Card onClick={() => { window.location.href = item.href }} style={{ position: 'relative', cursor: 'pointer', borderRadius: 10, overflow: 'hidden' }}
                        cover={
                            <img style={{ height: 167, objectFit: 'cover' }}
                                alt="example"
                                src={item.fmt}
                            />
                        }
                        actions={[
                            <a><Icon type="eye" />&nbsp;&nbsp;<span>{item.watches}</span></a>,
                            <a><Icon type="file-zip" />&nbsp;&nbsp;<span>{item.count}</span></a>,
                            <a><Icon type="download" />&nbsp;&nbsp;<span>下载</span></a>,
                        ]}
                    >

                        <Meta
                            title={item.title}
                        />


                        <div className="js" style={{ marginTop: 20 }}>
                            <div className="jianshi">
                                <Avatar src={item.user.avatar} />
                                <div className="mz">{item.user.name}</div>
                            </div>
                            <div className="f-right" style={{ marginTop: 8 }}>
                                类型：{item.biaoqian}
                            </div>
                        </div>
                        <div className="classifybox">
                            <div className="classify">{item.biaoqian}</div>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    )
}

export default CodeList