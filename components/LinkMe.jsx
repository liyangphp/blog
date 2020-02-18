import React, { useState } from 'react'
import { Card, Icon } from 'antd';

const LinkMe = () => {
    return (
        <Card className="linkcard"
            size="small">
            <div className="link">
                <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=3268388918&amp;site=qq&amp;menu=yes" target="_blank">
                    <Icon type="message" />
                    <span>联系站长</span>
                </a>
            </div>
        </Card>
    )
}

export default LinkMe