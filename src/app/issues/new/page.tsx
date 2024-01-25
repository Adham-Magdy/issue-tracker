"use client";
import {
  Button,
  Callout,
  CalloutRoot,
  CalloutText,
  TextField,
  Text,
  TextFieldRoot,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { string, z } from "zod";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

// interface IssueForm {
//   title: string;
//   description: string;
// }
type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  // useForm
  const { register, control, handleSubmit,formState:{errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3 p-3 border-blue-100 border-2 rounded-md "
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Unexpected error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {/* Display title error */}
        {
          errors.title && (
            <Callout.Root color="red" className="mb-5 bg-white">
          <Callout.Text>{errors.title.message}</Callout.Text>
        </Callout.Root>
          )
        }
        {/* Using controller to render markdown editor with useForm  */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description of issue" {...field} />
          )}
        />
        {
          errors.description && (
            <Callout.Root color="red"  className="mb-5 bg-white ">
          <Callout.Text>{errors.description.message}</Callout.Text>
        </Callout.Root>
          )
        }
        <Button className="cursor-pointer">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
