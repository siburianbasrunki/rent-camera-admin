export interface PaymentModel {
  id: string;
  bookingId: string;
  paymentMethod: string;
  amount: number;
  status: string;
  midtransOrderId: string;
  paymentCode: string;
  paymentUrl: string;
  expiryTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}
export interface CameraModel {
  id: string;
  brandId: string;
  name: string;
  price: string;
  avaliable: boolean;
  imageUrl: string;
  imageId: string;
  brand: {
    id: string;
    name: string;
    imageUrl: string;
    imageId: string;
  };
}

export interface BookingModel {
  id: string;
  userId: string;
  cameraId: string;
  date: string;
  duration: number;
  purpose: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  camera: CameraModel;
  payment: PaymentModel;
  user: UserModel;
}

export interface DetailBookingModel {
  id: string;
  userId: string;
  cameraId: string;
  date: string | null;
  startDate: string;
  endDate: string;
  duration: number;
  purpose: string;
  status: string;
  totalPrice: number;
  identityProofUrl: string;
  identityProofId: string;
  returnProofUrl: string | null;
  returnProofId: string | null;
  returnDate: string | null;
  createdAt: string;
  updatedAt: string;
  camera: {
    id: string;
    brandId: string;
    name: string;
    price: string;
    avaliable: boolean;
    imageUrl: string;
    imageId: string;
  };
  payment: {
    id: string;
    bookingId: string;
    paymentMethod: string;
    amount: number;
    status: string;
    midtransOrderId: string;
    paymentCode: string;
    paymentUrl: string | null;
    expiryTime: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    imageUrl: string;
    imageId: string;
    phoneNumber: string;
    otp: string | null;
    otpExpiry: string | null;
    createdAt: string;
    updatedAt: string;
  };
  isReturned: boolean;
  hasReturnProof: boolean;
}
