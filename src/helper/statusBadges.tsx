import Badge from "../components/ui/badge/Badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return (
        <Badge color="success" border>
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge color="info" border>
          Pending
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge color="error" border>
          Cancelled
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "SETTLED":
      return (
        <Badge color="success" border>
          Success
        </Badge>
      );
    case "PENDING":
      return (
        <Badge color="info" border>
          Pending
        </Badge>
      );
    case "EXPIRED":
      return (
        <Badge color="error" border>
          Expired
        </Badge>
    )
    case "FAILED":
      return (
        <Badge color="error" border>
          Failed
        </Badge>
      );
    default:
      return <Badge border>{status}</Badge>;
  }
};
