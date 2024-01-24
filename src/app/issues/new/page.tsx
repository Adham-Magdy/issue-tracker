"use client"
import { Button, TextField, TextFieldRoot } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'
import { string } from 'zod';
import { Controller, useForm } from 'react-hook-form';

interface IssueForm{
  title:string;
  description:string;
}
const NewIssuePage = () => {
  // useForm
  const {register,control} = useForm<IssueForm>();
  console.log(register('title'));
  return (
    <div className = "max-w-xl space-y-3 p-3 border-blue-100 border-2 rounded-md ">
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register}/>
      </TextField.Root>
      {/* Using controller to render markdown editor with useForm  */}
      <Controller
      name='description'
      control={control}
      render={({field}) => <SimpleMDE  placeholder='Description of issue' {...field}/>}
      />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
