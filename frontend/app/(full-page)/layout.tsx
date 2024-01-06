
import SimpleContainer from "@/components/layout/SimpleContainer";
import { Metadata } from "next";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "YACS",
  description: "Developed by OBSS",
};

export default function FullPageLayout({ children }: SimpleLayoutProps) {
  return (
    <>
      <SimpleContainer >{children}</SimpleContainer>
    </>
  );
}
