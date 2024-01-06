"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth(shouldRedirect: boolean) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    if (session === null) {
      router.push("/auth/login");
      setIsAuthenticated(false);
    } 
    else if (session !== undefined) {
      router.push("/auth/login");
      setIsAuthenticated(true);
    }
  }, [session]);

  return isAuthenticated;
}
