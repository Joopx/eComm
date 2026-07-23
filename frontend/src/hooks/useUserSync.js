import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { syncUser } from "../lib/api";

function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const hasSyncedRef = useRef(false);

  const { mutate: syncUserMutation, isPending, isSuccess } = useMutation({
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (!isSignedIn || !user || isPending || hasSyncedRef.current) return;

    syncUserMutation(
      {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName || "User",
        imageUrl: user.imageUrl || "",
      },
      {
        onSettled: () => {
          hasSyncedRef.current = true;
        },
      }
    );
  }, [isSignedIn, user, syncUserMutation, isPending]);

  return { isSynced: isSuccess };
}

export default useUserSync;
