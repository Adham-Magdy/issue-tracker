import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import IssueForm from "../../_components/page";

interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const prisma = new PrismaClient();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  // check if not found
  if(!issue) notFound();
  return (
    <>
    <IssueForm issue={issue}/>
    </>
  )
};

export default EditIssuePage;
