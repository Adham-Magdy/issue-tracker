"use client";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    // Alert dialog for confirmation
    <>
      {isClient && (
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red" className="w-44 cursor-pointer">
              Delete Issue
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this issue ? This action can not
              be undone.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button className="cursor-pointer" variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  className="cursor-pointer"
                  color="red"
                  onClick={async () => {
                    await axios.delete("/api/issues/" + issueID);
                    router.push("/issues");
                    router.refresh();
                  }}
                >
                  Delete Issue
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
