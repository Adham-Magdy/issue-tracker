import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({issueID}:{issueID:number}) => {
  return (
    <Button className="w-44">
    <Pencil2Icon />
    <Link href={`/issues/edit/${issueID}`}>Edit Issue</Link>
  </Button>
  );
};

export default EditIssueButton;
