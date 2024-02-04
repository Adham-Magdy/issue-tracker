import { createIssueSchema } from "@/app/validationSchemas";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  const prisma = new PrismaClient();


  // validate data
  const validationData = createIssueSchema.safeParse(body);

  if (!validationData.success) {
    return NextResponse.json(validationData.error.format(), { status: 400 });
  }

  // get issue data
  const issue = await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  });

  if(!issue){
    return NextResponse.json({error:"Invalid Issue"},{status:404});
  }

  //  updating issue
  const updatedIssue = await prisma.issue.update({
    where:{id:issue.id},
    data:{
        title:body.title,
        description:body.description
    }
  });

  return NextResponse.json(updatedIssue);
};
