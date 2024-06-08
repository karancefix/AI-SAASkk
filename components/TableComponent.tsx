import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import DeleteAdmin from './DeleteAdmin';

const TableComponent = ({ data, handleDelete }: any) => {
    return (
        <div>
            <Table>
                <TableCaption>List of Pro Users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Subscription id</TableHead>
                        <TableHead>Customer id</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center" colSpan={3}>Valid till</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        // if(!data || data.length === 0 )
                        data &&
                        data.map((item: any) => (
                            <TableRow className='text-white' key={item.stripe_subscription_id}>
                                <TableCell className="font-medium">{item.stripe_subscription_id}</TableCell>
                                <TableCell>{item.stripe_customer_id}</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$20.00</TableCell>
                                <TableCell className="text-right">{new Date(item.stripe_current_period_end).getMonth() + " / 2024"}</TableCell>
                                <TableCell className="text-right"><DeleteAdmin id={item.uid} handleDelete={handleDelete} /></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default TableComponent