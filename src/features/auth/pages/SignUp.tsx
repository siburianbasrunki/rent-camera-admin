import { HeadMetaData } from "@/shared/components/HeadMetaData";
import AuthLayout from "../components/layout/AuthLayout";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <HeadMetaData title="Sign Up" />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
