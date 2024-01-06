"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const router = useRouter();
  const { data: sesion, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration="1s"
        />
      </div>
    );
  }
  return <>{children}</>;
};

export default Auth;
