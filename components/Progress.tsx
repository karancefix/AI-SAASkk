import React from 'react'
import { Progress } from 'antd';

function ProgressComponent({ percentProp }: { percentProp: number }) {
    return (
        <Progress percent={percentProp} size="small" />
    )
}

export default ProgressComponent