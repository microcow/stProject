'use client'
import BoardChangeForm from '@/app/components/forms/BoardChangeForm';

export default function boardchange(id : any) {
    const b_id = String(id.params.id)

    return <BoardChangeForm b_id = {b_id}/>  

}