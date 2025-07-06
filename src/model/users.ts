export interface UserModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: 'USER' | 'ADMIN';
    imageUrl: string;
    createdAt: string;
}