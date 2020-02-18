import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import TagList from '../components/TagList'
import LinkMe from '../components/LinkMe'
import { connect } from 'react-redux'
import { Row, Col, BackTop } from 'antd';
import User from '../components/User';
import axios from 'axios'
import servicePath from '../config/apiUrl';
import CodeList from '../components/CodeList';
import ResCommand from '../components/ResCommand';

const Resource = (props) => {
    const [zhanz, setZhanz] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const getZhanInfo = () => {
        axios(servicePath.getZhanInfo).then(
            (res) => {
                setIsLoading(false)
                console.log(res.data.data)
                setZhanz(res.data.data)
            }
        )
    }

    useEffect(() => {
        if (isLoading) {
            getZhanInfo()
        }
    }, [])
    return (<div className="container">
        <Head>
            <title>博人堂--首页</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="博客，资源" />
            <meta name="keywords" content="博客，资源" />
        </Head>
        <Row type="flex" className="content">
            <Col xs={24} sm={24} md={24} lg={19} xl={19} style={{ padding: '1rem' }}>
                <TagList id={4} />
                <CodeList keywords={props.keywords} labels={props.labels} />
            </Col>
            <Col xs={0} sm={0} md={0} lg={5} xl={5}>
                <User user={zhanz} />
                <LinkMe />
                <ResCommand />
            </Col>
        </Row>
        <BackTop />
    </div>)
}

export default connect(
    function mapStateToProps(state) {
        return {
            labels: state.labels.labels,
            keywords: state.keywords.keywords
        }
    }
)(Resource)