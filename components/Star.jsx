import React, { useState, useEffect, useContext } from 'react'
import { message, Icon, Comment, List, Tooltip } from 'antd'
import axios from 'axios'
import { ItemContext } from './Comments'
import servicePath from '../config/apiUrl';
const Star = ({auth}) => {
    const item  = useContext(ItemContext)
    const [start, setStart] =useState(item.likes)
    const [action, setAction] = useState('like')
    const like=()=>{
        let dataProps={}
        dataProps.article_id=0;
        dataProps.user_id=auth.id;
        dataProps.reply_id=item.id;
        axios({
            method: 'post',
            url: servicePath.giveLike,
            data:dataProps,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            withCredentials: false,
        }).then(
            res => {
                if(res.status==204){
                    let number=start-1;
                    setStart(number);
                }else{
                    let number=start+1;
                    setStart(number);
                }
            }
        ).catch(function (error) {
            message.error(error.status)
        });
    };
    return (
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon
                    type="like"
                    theme={action === 'liked' ? 'filled' : 'outlined'}
                    onClick={like}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{start}</span>
        </span>
    )
};

export default Star