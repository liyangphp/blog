import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import TeachList from '../components/TeachList'
import TagList from '../components/TagList'
import LinkMe from '../components/LinkMe'
import { connect } from 'react-redux'
import { Row, Col, BackTop } from 'antd';
import User from '../components/User';
import axios from 'axios'
import servicePath from '../config/apiUrl';

const ImageText = (props) => {
    console.log('ImageText', props)
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
    return (
        <div className="container">
            <Head>
                <title>博人堂--教程</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="博客，教程" />
                <meta name="keywords" content="博客，教程" />
            </Head>
            <Row type="flex" className="content">
                <Col xs={24} sm={24} md={24} lg={19} xl={19} style={{ padding: '1rem' }}>
                    <TagList id={3} />
                    <TeachList keywords={props.keywords} labels={props.labels} />
                </Col>
                <Col xs={0} sm={0} md={0} lg={5} xl={5}>
                    <User user={zhanz} />
                    <LinkMe />
                </Col>
            </Row>
            <BackTop />
        </div>
    )
}


export default connect(
    function mapStateToProps(state) {
        return {
            labels: state.labels.labels,
            keywords: state.keywords.keywords
        }
    }
)(ImageText)
