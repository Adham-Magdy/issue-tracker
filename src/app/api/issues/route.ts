import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import IssuesPage from '../../issues/page';
import { PrismaClient } from "@prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";
// using zod to validate data

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const prisma = new PrismaClient();
  // validate body
  const validation = createIssueSchema.safeParse(body);
  // check if validation success
  if(!validation.success){
    return  NextResponse.json(validation.error.format(),{status:400});
  }

  // sending data to prisma client to insert in db
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });


  // return next response with new issue with status code 201: use has been created
  return NextResponse.json(newIssue,{status:201});
}; // end POST method

