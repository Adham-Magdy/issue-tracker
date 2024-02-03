import { PrismaClient } from "@prisma/client";
import { Box,Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string }; // id in url path is default string
}

const IssueDetailsPage = async ({ params }: Props) => {
  const prisma = new PrismaClient();

  // validate id number of page
  // if(typeof params.id !== 'number') notFound();
  // return issue from db based on id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  // if issue not found
  if (!issue) {
    notFound();
  }
  await delay(2000);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
       <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditIssueButton issueID={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
