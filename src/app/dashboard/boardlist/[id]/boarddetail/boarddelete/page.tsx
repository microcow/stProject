'use client'
import BoardDeleteForm from '@/app/components/forms/BoardDeleteForm';

export default function boarddelete(id : any) {
    const b_id = String(id.params.id)

    console.log("첫번째")
    return <BoardDeleteForm b_id = {b_id}/>  

}