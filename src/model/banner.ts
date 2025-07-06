export interface BannerModel {
  id: string;
  imageUrl: string ;
  imageId: string;
  title: string;
  subTitle: string;
  event: string;
}

export interface BannerCreationModel {
  id?: string;
  name?: string;
  image?: string | File;
  event?: string;
}
