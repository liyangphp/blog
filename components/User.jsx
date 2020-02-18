import React, {useState} from 'react'
import {Avatar,Divider} from 'antd'

const User = ({user}) => {
    return (
        <div className="comm-box">
            <div className="classifybox1">
                <div className="classify1">站长</div>
            </div>
            <div> <Avatar size={100} src={user.avatar}  /></div>
            <div className="author-introduction">
                {user.introduction}
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />
            </div>
        </div>
    )
}

export default User