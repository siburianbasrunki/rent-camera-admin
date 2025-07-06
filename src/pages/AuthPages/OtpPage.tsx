import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import { OtpPage } from "../../components/auth";

export default function OptMainPage() {
  return (
    <>
      <PageMeta
        title="Rent-Cam"
        description="This is Rent-Cam Management"
      />
      <AuthLayout>
        <OtpPage />
      </AuthLayout>
    </>
  );
}
