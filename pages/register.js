import React, { useState, useContext, createContext } from 'react';
import axios from 'axios'
import { Card, Input, Icon, Button, Spin, message } from 'antd';
import servicePath from '../config/apiUrl';
import Router from 'next/router'
function Register(props) {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const Register = () => {
        setIsLoading(true)
        const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!userName) {
            message.error('用户名不能为空')
            return false
        } else if (!email) {
            message.error('邮箱不能为空')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        } else if (!repassword) {
            message.error('确认密码不能为空')
            return false
        } else if (!reg.test(email)) {
            message.error('邮箱格式不正确')
            return false
        }

        let dataProps = {
            'username': userName,
            'email': email,
            'password': password,
            'password_confirmation': repassword,
        }
        console.log(password === repassword)

        axios({
            method: 'post',
            url: servicePath.registerUser,
            data: dataProps,
            withCredentials: false,
            transformResponse: function (data) {
                if (data.indexOf('errors') != -1) {
                    data = JSON.parse(data);
                    for (var item in data.errors) {
                        message.error(data.errors[item][0]);
                    }
                } else {
                    return data;
                }
            }
        }).then(
            res => {
                console.log(res)
                setIsLoading(false)
                if (res.status == '201') {
                    Router.push('/login')
                } else {
                    message.error('注册失败')
                }
            }
        ).catch(function (error) {
            // console.log(error)
            // message.error(error.status)
        });



        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    // const form=createContext({})

    // const { getFieldDecorator } = useContext(form);

    return (
        <div className="login-div" style={{paddingTop:20}}>
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="博人堂--注册" bordered={true} style={{ width: 360, margin: '0 auto', }} >

                    <Input
                        id="userName"
                        size="large"
                        placeholder="请输入你的用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input
                        id="email"
                        size="large"
                        placeholder="请输入你的邮箱"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setEmail(e.target.value) }}
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
                    <Input.Password
                        id="repassword"
                        size="large"
                        placeholder="请确认你的密码"
                        prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setRepassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={Register} > 注册 </Button>
                    <br /><br />
                    <div>
                        <a style={{ float: 'right' }} href="/login">
                            已有账户？请登录
                        </a>
                    </div>
                </Card>
            </Spin>
        </div>
    )
}
export default Register