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
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { string, z } from "zod";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";

// interface IssueForm {
//   title: string;
//   description: string;
// }
type IssueForm = z.infer<typeof createIssueSchema>;

// disabling ssr using lazy loader with dynamic method

const SimpleMDE = dynamic(()=> import("react-simplemde-editor"),{
  ssr:false
});
const NewIssuePage = () => {
  // useForm
  const { register, control, handleSubmit,formState:{errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("Unexpected error occurred");
    }
  });
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3 p-3 border-blue-100 border-2 rounded-md "
        onSubmit={onSubmit}
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
        <Button className="cursor-pointer" disabled={isSubmitting}>Submit New Issue{isSubmitting&& (<Spinner/>)}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
