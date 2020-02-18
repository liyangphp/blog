import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Layout, Card, Input, Icon, Button, Spin, Checkbox, message, BackTop } from 'antd';
import { connect } from 'react-redux'
import servicePath from '../config/apiUrl';
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import getConfig from 'next/config'

const { Content } = Layout;
const { publicRuntimeConfig } = getConfig()
const Login = (props) => {
    console.log('login',props)
    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [autoLogin, setAutoLogin] = useState(false)

    const github = () => {
        console.log('luyou',publicRuntimeConfig.OAUTH_URL)
        
        window.location.href=publicRuntimeConfig.OAUTH_URL
    }

    const checkLogin = () => {
        if (!userName) {
            message.error('用户名不能为空')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        }
        let dataProps = {
            'username': userName,
            'password': password
        }

        axios({
            method: 'POST',
            url: servicePath.goLogin,
            data: dataProps
        }).then(
            res => {
                setIsLoading(false)
                if (res.status === 201) {
                    localStorage.setItem('token',res.data.access_token)
                    console.log('logindata',props.add(res.data.access_token))
                    window.location.href='/'
                } else {
                    message.error('用户名或密码错误')
                }
            }
        ).catch(function (error) {
            console.log(error)
        });

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    const changeAutoLogin = () => {
        setAutoLogin(!autoLogin)
    }

    useEffect(() => {

    })

    return (
        <Layout className="ly">
            <Head>
                <title>博人堂 -- 登录</title>
            </Head>
            <Content className="content">
                <div className="login-div">
                    <Spin tip="Loading..." spinning={isLoading}>
                        <Card title="博人堂--登录" bordered={true} style={{ width: 360, margin: '20px auto',}} >
                            <Input
                                id="userName"
                                size="large"
                                placeholder="请输入你的用户名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                onChange={(e) => { setUserName(e.target.value) }}
                            />
                            <br /><br />

                            <Input.Password
                                id="password"
                                size="large"
                                placeholder="请输入你的密码"
                                prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <br /><br />
                            <div>
                                <Checkbox checked={autoLogin} onChange={changeAutoLogin}>
                                    记住密码
                            </Checkbox>
                                <a style={{ float: 'right' }}>
                                    忘记密码？
                            </a>
                            </div>
                            <br />
                            <Button type="primary" 
                            size="large" block
                            onClick={checkLogin}
                            > 登录 </Button>
                            <br /><br />
                            <div>
                                其他登录方式：
                            
                                    <a onClick={github}>
                                        <Icon type="github" style={{ fontSize: 18, }} />
                                    </a>
                                
                                {/*<Icon type="wechat" style={{ fontSize: 18, }} />&nbsp;&nbsp;&nbsp;*/}
                                {/*<Icon type="qq" style={{ fontSize: 18, }} />*/}
                                <Link href='/register'>
                                    <a style={{ float: 'right' }}>
                                        注册
                            </a>
                                </Link>
                            </div>
                        </Card>
                    </Spin>
                </div>
            </Content>
            <BackTop />
        </Layout>
    )
}

export default connect(
    function mapStateToProps(state) {
        return {
            token: state.token
        }
    },function mapDispatchToProps(dispatch){
        return {
            add: (token) => dispatch({type:'ADD',token:token})
        }
    }
)(Login)