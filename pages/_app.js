import App from 'next/app'
import '../public/style/comm.css'
import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'
import React from 'react'
import { Provider } from 'react-redux'
import Router from 'next/router'
import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'
import initializeStore from '../store/store'
import withRedux from '../lib/with-redux-app'

class MyApp extends App {
    state = {
        loading: false
    }

    startLoading = () => {
        this.setState({
            loading: true
        })
    }

    stopLoading = () => {
        this.setState({
            loading: false
        })
    }

    componentDidMount() {
        if(this.props.router.query.token){
            localStorage.setItem('token',this.props.router.query.token)
        }
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.stopLoading)
    }

    componentWillMount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.stopLoading)
    }

    
    // App组件的getInitialProps比较特殊
    // 能拿到一些额外的参数
    // Component: 被包裹的组件
    static async getInitialProps(ctx) {
        const { Component } = ctx
        let pageProps = {}

        // 拿到Component上定义的getInitialProps
        if (Component.getInitialProps) {
            // 执行拿到返回结果
            pageProps = await Component.getInitialProps(ctx)
        }

        
        // 返回给组件
        return {
            pageProps,
        }
    }

    render() {

        const { Component, pageProps, reduxStore } = this.props
        console.log('page',pageProps)
        return (
            <Provider store={reduxStore}>
                {this.state.loading ? <PageLoading /> : null}
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        )
    }
}

export default withRedux(MyApp)
