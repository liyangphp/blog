// import dynamic from 'next/dynamic'
// const Createoredit = dynamic(
//     import('../components/createoredit'),
//     {
//         ssr: false   //这个要加上,禁止使用 SSR
//     }
// )

// export default () => <Createoredit />

import React, { useState, useEffect, createContext, useMemo } from 'react';
import marked from 'marked'
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { Layout, Row, Col, Input, Select, Button, Upload, Modal, Icon, message, BackTop } from 'antd'
import Head from 'next/head'
import servicePath from '../config/apiUrl';
import Router from 'next/router'
import dynamic from 'next/dynamic'
export const FmtContext = createContext({})
const { Dragger } = Upload;
const UploadImage = dynamic(
    import("../components/UploadImage"),
    {
        ssr: false   //这个要加上,禁止使用 SSR
    }
)

const SimpleMDE = dynamic(
    import("react-simplemde-editor"),
    {
        ssr: false   //这个要加上,禁止使用 SSR
    }
)

const progressText = '![Uploading file {uid}...]()';

const urlText = '![file]({filename})';

const { Content } = Layout;
const Option = Select.Option;
const { TextArea } = Input



const Create = (props) => {
    console.log('id2', props.id)
    const [simplemde, setSimplemde] = useState()
    const [id, setId] = useState(JSON.stringify(props) != "{}" && props.id ? props.id : null)
    const [token, setToken] = useState()
    const [visible, setVisible] = useState(false)
    const [articleTitle, setArticleTitle] = useState()
    const [introducemd, setIntroducemd] = useState()
    const [introducehtml, setIntroducehtml] = useState('等待编辑')
    const [selectedType, setSelectType] = useState(1)
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [coin, setCoin] = useState()
    const [baiduurl, setBaiduurl] = useState()
    const [baidupwd, setBaidupwd] = useState()
    const [count, setCount] = useState()
    const [fmt, setFmt] = useState()
    const [children, setChildren] = useState([])
    const [zancun, setZancun] = useState(false)
    const [mdeValue, setMdeValue] = useState('')//文章文章内容
    const [labValue, setLabValue] = useState()
    const handleChange = value => {
        console.log('value', value)
        setMdeValue(value)
    };
    const showModal = () => {
        setVisible(true)
    };

    const checkLogin = (token) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();


        if (token != null) {
            axios({
                method: 'get',
                url: servicePath.getUserInfo,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                withCredentials: false,
                cancelToken: source.token,
                transformResponse: function (data) {
                    console.log('user', data)
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
                    res.data = eval('(' + res.data + ')');
                    if (!localStorage.getItem('user_id') ||
                        localStorage.getItem('user_id') != res.data.data.id) {
                            Router.push('/login')
                    }

                }
            ).catch(function (error) {
                console.log(error)
            });
        } else {
            Router.push('/login')
        }
    }

    const getdetail = (id) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getArticleDetail + id,
            withCredentials: false,
            cancelToken: source.token,
        }).then(
            res => {
                console.log('id1', id)
                source.cancel('方法被取消');
                setArticleTitle(res.data.data.title);
                setIntroducemd(res.data.data.desc);
                setIntroducehtml(res.data.data.desc);
                setSelectType(res.data.data.category_id)
                setCoin(res.data.data.coin)
                setBaidupwd(res.data.data.baiduyu_pwd)
                setBaiduurl(res.data.data.baiduyu_url)
                setCount(res.data.data.count)
                setFmt(res.data.data.fmt);
                setMdeValue(res.data.data.content)
                console.log('tags', res.data.data.tags)
                setLabValue(res.data.data.tags)
            }
        ).catch(function (error) {
            console.log(error)
        });
    };


    const getlabs = (selectedType) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getLabs + '?id=' + selectedType,
            cancelToken: source.token,
            transformResponse: function (data) {
                console.log(data)
                if (data.indexOf('Unauthenticated') != -1) {
                    source.cancel('方法被取消');
                    window.location.href = '/'
                } else {
                    return data;
                }
            }
        }).then(
            res => {
                setIsLoading(false)
                res.data = eval('(' + res.data + ')');
                source.cancel('方法被取消');
                let labs = [];
                for (let item in res.data.data) {
                    labs.push(<Option key={item} value={res.data.data[item].label}>{res.data.data[item].label}</Option>)
                }

                setChildren(labs)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }



    const stopSave = () => {
        //localStorage.setItem('zancun', !zancun)
        setZancun(!zancun)
    }

    const onSubmit = () => {
        if (!articleTitle) {
            message.error('文章标题不能为空')
            return false
        } else if (!introducehtml) {
            message.error('文章简介不能为空')
            return false
        } else if (!selectedType) {
            message.error('文章类型不能为空')
            return false
        }

        if (JSON.stringify(props) != "{}" && props.id) {
            let values = labValue.join(',')
            let dataProps = {
                'id': props.id,
                'title': articleTitle,
                'desc': introducehtml,
                'category_id': selectedType,
                'content': mdeValue,
                'coin': coin,
                'fmt': fmt,
                'user_id': localStorage.getItem('user_id'),
                'biaoqian': values,
                'baiduyu_url': baiduurl,
                'baiduyu_pwd': baidupwd,
                'count': count,
                'status': localStorage.getItem('user_id') == 1 ? 1 : 0,
            }



            axios({
                method: 'patch',
                url: servicePath.getArticleDetail + props.id,
                data: dataProps,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }, transformResponse: function (data) {
                    if (data.indexOf('errors') != -1) {
                        data = JSON.parse(data);
                        for (var item in data.errors) {
                            message.error(data.errors[item][0]);
                        }
                    } else if (data.indexOf('Unauthenticated') != -1) {
                        Router.push('/')
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    console.log(res)
                    Router.push('/')
                }
            ).catch(function (error) {
                console.log(error)
            });

        } else {
            let dataProps = {
                'title': articleTitle,
                'desc': introducehtml,
                'category_id': selectedType,
                'content': mdeValue,
                'coin': coin,
                'fmt': fmt,
                'user_id': localStorage.getItem('user_id'),
                'biaoqian': labValue,
                'baiduyu_url': baiduurl,
                'baiduyu_pwd': baidupwd,
                'count': count,
                'status': localStorage.getItem('user_id') == 1 ? 1 : 0,
            }

            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }, transformResponse: function (data) {
                    if (data.indexOf('errors') != -1) {
                        data = JSON.parse(data);
                        for (var item in data.errors) {
                            message.error(data.errors[item][0]);
                        }
                    } else if (data.indexOf('Unauthenticated') != -1) {
                        Router.push('/')
                    } else {
                        return data;
                    }
                }
            }).then(
                res => {
                    console.log(res)
                    Router.push('/')
                }
            ).catch(function (error) {
                console.log(error)
            });
        }
    }

    const getcategory = () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getCategories,
            cancelToken: source.token,
        }).then(
            res => {
                source.cancel('方法被取消');
                let options = [];
                for (let i = 0; i < res.data.length; i++) {
                    options.push(<Option key={res.data[i].id} value={res.data[i].id.toString(36)}>{res.data[i].category_name}</Option>)
                }
                setOptions(options)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    function handleChange2(value) {
        getlabs(value)
        setSelectType(value)
    }
    const handleCancel = e => {
        setVisible(false)
    };



    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });



    const handleChange1 = value => {
        setLabValue(value)
    }



    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const pr = {
        name: 'file',
        supportServerRender: true,
        action: servicePath.uploadArticleImage,
        beforeUpload: file => {
            const text = progressText.replace('{uid}', file.uid);
            simplemde.codemirror.replaceSelection(text);
            file.insertText = text;
        },
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        onChange({ file }) {
            console.log(file)
            if (file.status === 'done') {
                console.log('simplemde', simplemde)
                const { response, originFileObj } = file;
                const { file_path } = response;
                const cursor = simplemde.codemirror.getCursor();
                const newValue = urlText.replace('{filename}', file_path);
                const text = simplemde.codemirror.getValue().replace(originFileObj.insertText, newValue);
                simplemde.codemirror.setValue(text);

                cursor.ch += newValue.length - progressText.length;
                simplemde.codemirror.setCursor(cursor);
                simplemde.codemirror.focus();
                originFileObj.insertText = newValue;
            } else if (file.status === 'error') {
                message.error(`${file.name} file upload failed.`);
            }

            setVisible(false)
        },
    };

    const getInsance = instance => {
        setSimplemde(instance)
    };

    const detail = useMemo(() => getdetail(id), [id])

    useEffect(() => {
        
        if (isLoading) {
            { detail }
            getcategory()
            getlabs(selectedType)
            if (localStorage.getItem('token')) {
                checkLogin(localStorage.getItem('token'))
                setToken(localStorage.getItem('token'))
            } else {
                Router.push('/login')
            }
        }
    })







    return (
        <Layout className="ly" style={{paddingTop:32,width:'90%'}}>
            <Head>
                <title>博人堂 -- 编辑文章</title>
            </Head>
            <Content className="content">
                <Row gutter={5}>
                    <Col span={18}>
                        <Row gutter={10} >
                            <Col span={20}>
                                <Input
                                    value={articleTitle}
                                    onChange={(e) => { setArticleTitle(e.target.value) }}
                                    placeholder="标题"
                                    size="large" />
                            </Col>
                            <Col span={4}>
                                &nbsp;
                                <Select
                                    onChange={handleChange2}
                                    defaultValue={selectedType + ''}
                                    size="large">
                                    {options}
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={10} >
                            <Col span={24}>
                                <SimpleMDE
                                    getMdeInstance={getInsance}
                                    options={{
                                        autofocus: true,
                                        autosave: { enabled: false, uniqueId: "MyUniqueID", delay: 1000, },
                                        toolbar: ['bold', 'italic', 'heading',
                                            "code", "table", "clean-block", 'quote',
                                            'horizontal-rule', 'unordered-list',
                                            'ordered-list', 'link',
                                            {
                                                name: 'image',
                                                action: () => {
                                                    showModal()
                                                },
                                                className: 'fa fa-file-image-o',
                                                title: '上传',
                                            }, 'preview',
                                            'side-by-side', 'fullscreen'],
                                        spellChecker: false
                                    }}
                                    onChange={handleChange}
                                    value={mdeValue}
                                />
                            </Col>
                        </Row>

                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Button type={zancun ? 'primary' : 'default'} size="large" onClick={stopSave}>暂存文章</Button>&nbsp;
                                <Button onClick={onSubmit} type="primary" size="large" >发布</Button>
                                <br />
                            </Col>

                            <Col span={24}>
                                <br />
                                <TextArea
                                    rows={4}
                                    style={{ height: 154 }}
                                    value={introducemd}
                                    onChange={changeIntroduce}
                                    onPressEnter={changeIntroduce}
                                    placeholder="简介"
                                />
                                <br /><br />
                                <div
                                    className="introduce-html"
                                    dangerouslySetInnerHTML={{ __html: '简介：' + introducehtml }} >
                                </div>
                            </Col>

                            <Col span={24} style={{ marginTop: '20px' }}>
                                <FmtContext.Provider value={{ fmt, setFmt }}>
                                    <UploadImage />
                                </FmtContext.Provider>
                                {fmt && <img src={fmt} style={{ width: '100%', marginTop: 10 }} />}
                            </Col>

                            <Col span={24} style={{ marginTop: '20px' }}>
                                <Select
                                    mode="tags"
                                    type={{ isSelectOptGroup: false }}
                                    style={{ width: '100%' }}
                                    placeholder="标签"
                                    value={labValue}
                                    onChange={handleChange1}
                                >
                                    {children}
                                </Select>
                            </Col>

                            <Col span={24} style={{ marginTop: '20px' }}>
                                <Input
                                    value={coin}
                                    onChange={(e) => { setCoin(e.target.value) }}
                                    placeholder="支付积分" />
                            </Col>

                            <Col span={17} style={{ marginTop: '20px' }}>
                                <Input
                                    value={baiduurl}
                                    onChange={(e) => { setBaiduurl(e.target.value) }}
                                    placeholder="百度云盘的链接地址" />
                            </Col>

                            <Col span={1} style={{ marginTop: '20px' }}>
                            </Col>


                            <Col span={6} style={{ marginTop: '20px' }}>
                                <Input
                                    value={baidupwd}
                                    onChange={(e) => { setBaidupwd(e.target.value) }}
                                    placeholder="密码" />
                            </Col>

                            <Col span={24} style={{ marginTop: '20px' }}>
                                <Input
                                    value={count}
                                    onChange={(e) => { setCount(e.target.value) }}
                                    placeholder="课程数/资源大小" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
            <BackTop />
            <Modal
                footer={null}
                title="上传图片"
                visible={visible} onCancel={handleCancel}>

                <Dragger {...pr}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽上传图片</p>
                    <p className="ant-upload-hint">
                        支持单次或批量上传。支持图片格式文件
                    </p>
                </Dragger>
            </Modal>
        </Layout>
    )
}

Create.getInitialProps = async (context) => {
    let id = context.ctx.query.id
    console.log('id', typeof id != "undefined")
    if (JSON.stringify(context.ctx.query) != "{}" && typeof id != "undefined") {
        const promise = new Promise((resolve) => {
            resolve({ id: id })
        })
        return await promise
    } else {
        return await new Promise(resolve => {
            resolve({})
        })
    }
}

export default Create