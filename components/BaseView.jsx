import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Input, Select, Upload, message, Tag, Icon, Modal} from 'antd';
import axios from "axios";
import servicePath from '../config/apiUrl';
import { Router } from 'next/router';

const {Option} = Select;


const BaseView = () => {
    const newTag = useRef(null)
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setinputValue] = useState()
    const [inputVisible, setInputVisible] = useState(false)
    const [newTags, setNewTags] = useState([])
    const [avatar, setAvatar] = useState()
    const [email, setEmail] = useState()
    const [nickname, setNickname] = useState()
    const [introduce, setIntroduce] = useState()
    const [professional, setProfessional] = useState()
    const [company, setCompany] = useState()
    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()

    const [provinceData, setProvinceData] = useState();

    const [cityData, setCityData] = useState();

    const [cities, setCities] = useState();

    const [secondCity, setSecondCity] = useState()

    const [token, setToken] = useState()


    const getProvinces = (provinceId) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getProvinces,
            withCredentials: false,
            cancelToken: source.token,
        }).then(
            res => {
                source.cancel('方法被取消');
                console.log('qweqweqw', res.data);
                let defualt='';
                for(let i=0;i<res.data.length;i++){
                    if(provinceId && res.data[i].id==provinceId){
                        defualt=res.data[i].name
                    }
                }



                if (res.data) {
                    setProvinceData(
                        <Select
                            defaultValue={defualt==''?res.data[0].name:defualt}
                            style={{width: 120}}
                            onChange={handleProvinceChange}
                        >
                            {res.data.map(province => (
                                <Option key={province.id}>{province.name}</Option>
                            ))}
                        </Select>
                    );


                }

            }
        ).catch(function (error) {
            console.log(error)
        });

    }

    const getCity = (id,cityId) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getCity+'?id=' + id,
            withCredentials: false,
            cancelToken: source.token,
        }).then(
            res => {
                setCities(res.data[0].children)
                setCityData(res.data[0].children.map(city => (
                    <Option key={city.id}>{city.name}</Option>
                )));

                setSecondCity(res.data[0].children[0])

                for (let item in res.data[0].children) {
                    console.log('1',res.data[0].children[item].id)
                    console.log('2',cityId)
                    if (res.data[0].children[item].id == cityId) {
                        setSecondCity(res.data[0].children[item])
                    }
                }



                source.cancel('方法被取消');
            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    //获取会员数据
    const checkLogin = (token) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if (token) {
            axios({
                method: 'get',
                url: servicePath.getUserInfo,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                withCredentials: false,
                cancelToken: source.token,
                transformResponse: function (data) {
                    console.log('data',data)
                    if (data.indexOf('errors') != -1) {
                        data = JSON.parse(data);
                        for (var item in data.errors) {
                            message.error(data.errors[item][0]);
                        }
                    } else if (data.indexOf('Unauthenticated') != -1) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user_id')
                        message.error('登录已过期，请重新登录');
                        Router.push('/login')
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    source.cancel('方法被取消');
                    setIsLoading(false)
                    console.log('user123',res.data)
                    res.data = eval('(' + res.data + ')');
                    console.log('user1',res.data.data)
                    if(!localStorage.getItem('user_id') || localStorage.getItem('user_id')!= res.data.data.id){
                        Router.push('/login');
                    }else{
                        setUser(res.data.data);
                        setIntroduce(res.data.data.introduction)
                        setAvatar(res.data.data.avatar)
                        setNickname(res.data.data.name)
                        setEmail(res.data.data.email)
                        getThird(res.data.data.id)
                    }
                    
                }
            ).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('asasdas3')
        }
    }

    const handlerSubmit = () => {
        let dataProps = {}
        dataProps.email = email;
        dataProps.nickname = nickname;
        dataProps.introduction = introduce;
        dataProps.avatar = avatar;
        dataProps.tags = newTags.length>0 ? newTags.join(',') : [];
        dataProps.professional = professional;
        dataProps.company = company;
        dataProps.province_id = provinceId;
        dataProps.city_id = cityId;
        dataProps.user_id=user.id;
        axios({
            method: 'post',
            url: servicePath.saveThird,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: dataProps
        }).then(res => {
            console.log(res);
            message.success(res.data.msg)
            window.location.href="/"
        })
    }

    const getThird = (id) =>{
        axios({
            method: 'get',
            url: servicePath.getThird+'?user_id='+id,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }).then(res => {
            if (res.data.data) {
                console.log('third',res.data.data)
                let arr = res.data.data.tags?res.data.data.tags.split(","):[];
                console.log(arr)
                setNewTags(arr)
                setCompany(res.data.data.company)
                setProfessional(res.data.data.professional)
                setProvinceId(res.data.data.province_id)
                setCityId(res.data.data.city_id)
                console.log('province',provinceId)
                getProvinces(res.data.data.province_id?res.data.data.province_id:1)
                getCity(res.data.data.province_id?res.data.data.province_id:1,res.data.data.city_id?res.data.data.city_id:1)

            }
        })
    }

    const handleInputChange = (e) => {
        setinputValue(e.target.value)
    }

    const handleInputConfirm = () => {
        let arr = newTags;
        if (inputValue && newTags.indexOf(inputValue) === -1) {
            arr.push(inputValue)
        }
        setNewTags(arr);
        setinputValue('');
        setInputVisible(false)
    }

    const showInput = () => {
        setInputVisible(true)
    }

    const handleProvinceChange = value => {
        setProvinceId(value);

        getProvinces(provinceId)
        getCity(provinceId,value)
    };

    const onSecondCityChange = value => {
        setCityId(value)
        for (let item in cities) {
            console.log(parseInt(cities[item]['id']) == value)
            if (parseInt(cities[item]['id']) == value) {
                console.log(cities[item])
                setSecondCity(cities[item])
            }
        }
    };

    const handleUploadChange = ({ file }) => {
        console.log(file)
        switch (file.status) {
            case 'done':
                message.destroy();
                message.success('上传成功！');
                // @ts-ignore
                setAvatar(file.response.file_path)
                break;
            case 'error':
                message.destroy();
                message.error(file.response.message);
                break;
        }
    };


    useEffect(() => {
        checkLogin(localStorage.getItem('token'))
        setToken(localStorage.getItem('token'))
    },[])

    return (
        <div className="baseView">
            <div className="left">
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="邮箱">
                        <Input onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email}/>
                    </Form.Item>

                    <Form.Item label="昵称">
                        <Input onChange={(e) => {
                            setNickname(e.target.value)
                        }} value={nickname}/>
                    </Form.Item>

                    <Form.Item label="个人简介">
                        <Input.TextArea
                            placeholder="个人简介"
                            rows={4}
                            onChange={(e) => {
                                setIntroduce(e.target.value)
                            }}
                            value={introduce}
                        />
                    </Form.Item>

                    <Form.Item label="标签">
                        <div className="tags" style={{lineHeight:'30px'}}>
                            {newTags && newTags.map(item => (<Tag key={item}>{item}</Tag>))}
                            {inputVisible && (
                                <Input
                                    ref={newTag}
                                    type="text"
                                    size="small"
                                    style={{width: 78}}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (<Tag
                                    onClick={showInput}
                                    style={{background: '#fff', borderStyle: 'dashed'}}>
                                    <Icon type="plus"/>
                                </Tag>
                            )}
                        </div>
                    </Form.Item>

                    <Form.Item label="职称">
                        <Input onChange={(e) => {
                            setProfessional(e.target.value)
                        }} value={professional}/>
                    </Form.Item>

                    <Form.Item label="公司">
                        <Input onChange={(e) => {
                            setCompany(e.target.value)
                        }} value={company}/>
                    </Form.Item>

                    <Form.Item label="所在城市">
                        {provinceData}
                        <Select
                            style={{width: 120, marginLeft: 10}}
                            value={secondCity ? secondCity.name : ''}
                            onChange={onSecondCityChange}>
                            {cityData}
                        </Select>
                    </Form.Item>

                    <Button type="primary" onClick={handlerSubmit}>
                        更新信息
                    </Button>

                </Form>
            </div>
            <div className="right">
                <div className="avatar_title">
                    用户头像
                </div>

                <div className="avatar">
                    <img style={{borderRadius:'50%'}} src={avatar} alt="avatar"/>
                </div>


                <Upload
                    accept="image/*"
                    name="file"
                    className="upload"
                    action={servicePath.uploadArticleImage}
                    showUploadList={false}
                    headers={{Authorization: 'Bearer ' + token}}
                    onChange={handleUploadChange}
                >

                    <div className="button_view">
                        <Button icon="upload">
                            上传头像
                        </Button>
                    </div>

                </Upload>
            </div>
        </div>
    )
}
export default BaseView
