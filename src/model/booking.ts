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
