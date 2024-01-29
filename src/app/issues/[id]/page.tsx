import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { PrismaClient } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import { number } from 'zod';

interface Props{
    params:{id: string}; // id in url path is default string
};

const IssueDetailsPage = async ({params}:Props) => {
    const prisma = new PrismaClient();

    // validate id number of page
    // if(typeof params.id !== 'number') notFound();
    // return issue from db based on id
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)},
    });

    // if issue not found
    if(!issue){
        notFound();
    }
  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex gap={"5"} mb={"5"}>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
        {issue.description}
        </Card>
       
        
    </div>
  )
}

export default IssueDetailsPage
