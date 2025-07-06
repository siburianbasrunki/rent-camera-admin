import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta title="Rent-Cam" description="This is Rent-Cam Management" />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
