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
import Spinner from "@/app/components/Spinner";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueID);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    // Alert dialog for confirmation
    <>
      {isClient && (
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button
              color="red"
              className="w-44 cursor-pointer"
              disabled={isDeleting}
            >
              Delete Issue
              {isDeleting && <Spinner />}
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
                  onClick={deleteIssue}
                >
                  Delete Issue
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
      {/* Show Alert dialog in case of error */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt={"3"}
            onClick={() => setError(false)}
            className="cursor-pointer"
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
