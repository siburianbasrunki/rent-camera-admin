export interface Book {
  id: string;
  authorId: string;
  title: string;
  imageUrl: string;
  imageId: string;
  author: {
    id: string;
    name: string;
  };
}
