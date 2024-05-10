import { Trash } from 'lucide-react'
import React from 'react'

type DeleteProps = {
    id: string
}
const Delete = ({ id }: DeleteProps) => {
    return (
        <div className="absolute right-10 top-10" onClick={() => console.log(id)}>
            <Trash />
        </div>
    )
}

export default Delete