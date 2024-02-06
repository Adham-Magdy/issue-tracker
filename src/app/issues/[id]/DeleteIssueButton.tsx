"use client";
import {  AlertDialogRoot, AlertDialogTrigger, Button, Flex} from "@radix-ui/themes";
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { useEffect, useState } from "react";


const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const [isClient,setIsClient] = useState(false);
  useEffect(()=>{
    setIsClient(true)
  },[])
  return (
    // Alert dialog for confirmation
    <>
    {isClient && (
      <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="w-44 cursor-pointer">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue ?
           This action can not be undone.  
        </AlertDialog.Description>
    
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Revoke access
            </Button>
          </AlertDialog.Action>
        </Flex>

      </AlertDialog.Content>
    </AlertDialog.Root>
  
    )}
    </>
  );
};

export default DeleteIssueButton;
