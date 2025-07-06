import { getEndpoints } from "../config/config";
import type { Brand } from "../model/brand";

const BrandService = {
  async getBrand(): Promise<Brand[]> {
    const { brand } = getEndpoints();
    const res = await fetch(brand);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async createBrand(formData: FormData): Promise<Brand> {
    const { brand } = getEndpoints();
    const res = await fetch(brand, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async updateBrand(id: string, formData: FormData): Promise<Brand> {
    const { brand } = getEndpoints();
    const res = await fetch(`${brand}/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async deleteBrand(id: string): Promise<void> {
    const { brand } = getEndpoints();
    const res = await fetch(`${brand}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  },
};

export default BrandService;