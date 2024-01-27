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
import ErrorMessage from "@/app/components/ErrorMessage";

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
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        {/* Using controller to render markdown editor with useForm  */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description of issue" {...field} />
          )}
        />
       <ErrorMessage>
        {errors.description?.message}
       </ErrorMessage>
        <Button className="cursor-pointer">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
