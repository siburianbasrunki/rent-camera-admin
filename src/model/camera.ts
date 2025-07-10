export interface Camera {
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

export interface DetailCamera {
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
  ciri_ciri: {
    ciri: string;
  }[];
  photos: {
    id: string;
    imageUrl: string;
    imageId: string;
  }[];
}