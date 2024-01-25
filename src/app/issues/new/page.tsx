"use client"
import { Button, TextField, TextFieldRoot } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'
import { string } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm{
  title:string;
  description:string;
}
const NewIssuePage = () => {
  // useForm
  const {register,control,handleSubmit} = useForm<IssueForm>();
  const router = useRouter();
  console.log(register('title'));
  return (
    <form className = "max-w-xl space-y-3 p-3 border-blue-100 border-2 rounded-md " onSubmit={handleSubmit(async (data)=>{
      await axios.post("/api/issues",data);
      router.push('/issues');
    })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register("title")}/>
      </TextField.Root>
      {/* Using controller to render markdown editor with useForm  */}
      <Controller
      name='description'
      control={control}
      render={({field}) => <SimpleMDE  placeholder='Description of issue' {...field}/>}
      />
      <Button className='cursor-pointer'>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
