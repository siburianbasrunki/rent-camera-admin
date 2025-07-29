import { HeadMetaData } from "@/shared/components/HeadMetaData";
import AuthLayout from "../components/layout/AuthLayout";
import { VerifyOTPForm } from "../components/VerifyOTPForm";

export default function VerifyOTP() {
  return (
    <>
      <HeadMetaData title="Verify OTP" />
      <AuthLayout>
        <VerifyOTPForm />
      </AuthLayout>
    </>
  );
}
