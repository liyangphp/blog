import Link from 'next/link'
import { Button } from 'antd'
import { Layout, Row, Col } from 'antd';
import Foot from './Foot';
import Head from './Head';
export default ({ children }) => (
    <header>
        <Head />
        <section style={{position:'relative',zIndex:999,minHeight:'85vh'}}>{children}</section>
        <div style={{clear:"both"}}></div>
        <Foot />
    </header>
)
