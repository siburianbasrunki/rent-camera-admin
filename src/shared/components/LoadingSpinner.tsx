import { Spinner } from "./ui/spinner";

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}
