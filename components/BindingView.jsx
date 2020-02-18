import React from 'react'
import { Icon, List } from 'antd';

const BindingView = () => {
    const getData = () => [
        {
            title: '绑定github',
            description: '当前未绑定github账号',
            actions: [
                <a key="Bind">
                    绑定
                </a>,
            ],
            avatar: <Icon type="github" className="github" />,
        },
        {
            title: "绑定QQ",
            description: '当前未绑定QQ账号',
            actions: [
                <a key="Bind">
                    绑定
                </a>,
            ],
            avatar: <Icon type="qq" className="qq" />,
        },
        {
            title: '绑定微信',
            description: '当前未绑定微信账号',
            actions: [
                <a key="Bind">
                    绑定
                </a>,
            ],
            avatar: <Icon type="wechat" className="dingding" />,
        },
    ];
    return (
        <List
            itemLayout="horizontal"
            dataSource={getData()}
            renderItem={item => (
                <List.Item actions={item.actions}>
                    <List.Item.Meta style={{fontSize:36,}}
                        avatar={item.avatar}
                        title={item.title}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}

export default BindingView