// service/user.ts
import { getEndpoints } from "../config/config";
import { UserModel } from "../model/users";

const UserService = {
  async getUsers(): Promise<UserModel[]> {
    const { user } = getEndpoints();
    const res = await fetch(user);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  // async getUserById(id: string): Promise<UserModel> {
  //   const { user } = getEndpoints();
  //   const res = await fetch(`${user}/${id}`);
  //   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //   const json = await res.json();
  //   return json.data;
  // },
  async getUserById(id: string): Promise<UserModel> {
    const { user } = getEndpoints();
    const res = await fetch(`${user}/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
  async createUser(formData: FormData): Promise<UserModel> {
    const { regiter } = getEndpoints();
    const res = await fetch(regiter, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    const json = await res.json();
    return json.data;
  },

  async updateUser(id: string, formData: FormData): Promise<UserModel> {
    const { user } = getEndpoints();
    const res = await fetch(`${user}/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    const json = await res.json();
    return json.data;
  },

  async deleteUser(id: string): Promise<void> {
    const { user } = getEndpoints();
    const res = await fetch(`${user}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  },
};

export default UserService;