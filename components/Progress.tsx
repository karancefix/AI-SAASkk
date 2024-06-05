import React from 'react'
import { Progress } from 'antd';
// import Spinner from './Spinner';

function ProgressComponent({ percentProp }: { percentProp: number }) {
    return (
        <div className='flex'>
            <Progress percent={percentProp} size="small" />
            {/* <Spinner /> */}
        </div>
    )
}

export default ProgressComponent