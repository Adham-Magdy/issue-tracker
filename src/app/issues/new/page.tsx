"use client"
import { Button, TextArea, TextField, TextFieldRoot } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className = "max-w-xl space-y-3 p-3 border-blue-100 border-2 rounded-md ">
      <TextField.Root>
        <TextField.Input placeholder='Title'/>
      </TextField.Root>
      <TextArea  placeholder='Description of issue'/>
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
