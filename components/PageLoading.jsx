import { Spin } from 'antd'
export default () => (
    <div style={{position: 'fixed',
    left: 0,
    top: '40%',
    right:0,
    background: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1001,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
    }}>
        <Spin />
    </div>
)