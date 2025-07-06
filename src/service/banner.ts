import { getEndpoints } from "../config/config";
import type { BannerModel } from "../model/banner";

const BannerService = {
  async getBanner(): Promise<BannerModel> {
    const { banner } = getEndpoints();
    const url = banner;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async updateBanner(formData: FormData): Promise<BannerModel> {
    const { banner } = getEndpoints();
    const res = await fetch(banner, {
      method: "POST",
      body: formData,
    
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default BannerService;