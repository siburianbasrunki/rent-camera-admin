import { HeadMetaData } from "@/shared/components/HeadMetaData";
import AuthLayout from "../components/layout/AuthLayout";
import SignInForm from "../components/SIgnInForm";

export default function SignIn() {
  return (
    <>
      <HeadMetaData title="Sign In" />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
