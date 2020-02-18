import React, { useState, useEffect } from 'react'
import TagSelect from 'ant-design-pro/lib/TagSelect';
import axios from 'axios'
import { connect } from 'react-redux'
import { Card } from 'antd';
import servicePath from '../config/apiUrl';
const TagList = ({id,update_labels,labels}) => {
    console.log('labels', labels)
    const [labs, setLabs] = useState(labels);
    const [dataLoading, setDataLoading] = useState(true)
    function handleFormSubmit(checkedValue) {
        console.log(checkedValue)
        update_labels(checkedValue.join(','))
    }

    const getlabs = () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios({
            method: 'get',
            url: servicePath.getTags+'?id='+id,
            cancelToken: source.token,
        }).then(
            res => {
                console.log(res.data.data)
                source.cancel('方法被取消');
                let labes = [];
                for (let item in res.data.data) {
                    labes.push(<TagSelect.Option key={res.data.data[item].label} value={res.data.data[item].label}>{res.data.data[item].label}</TagSelect.Option>)
                }
                setLabs(labes)
                setDataLoading(false)
            }
        ).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
        if(dataLoading){
            getlabs()
        }
    },[])

    return (
        <Card className="tagcard" loading={dataLoading}>
            {!dataLoading && (<TagSelect
                className="tagselect"
                onChange={handleFormSubmit}
                hideCheckAll={true}
                actionsText={{
                    expandText: '展开',
                    collapseText: '收起',
                    selectAllText: '全部'
                }}
                expandable>
                <span className="all">所有标签：</span>
                {labs}
            </TagSelect>)}
        </Card>
    )
}

export default connect(
    function mapStateToProps(state) {
        return {
            labels: state.labels,
            current: state.current,
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            update: (current) =>dispatch({type:'UPDATE_CURRENT', current}),
            update_labels:(labels) => dispatch({type:'UPDATE_LABELS', labels}),
        }
    }
)(TagList)