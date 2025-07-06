import { getEndpoints } from "../config/config";
import type { Camera, DetailCamera } from "../model/camera";

const CameraService = {
  async getCameras(searchTerm?: string): Promise<Camera[]> {
    const { camera } = getEndpoints();
    const url = searchTerm ? `${camera}?search=${searchTerm}` : camera;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async getCameraById(id: string): Promise<DetailCamera> {
    const { camera } = getEndpoints();
    const res = await fetch(`${camera}/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async createCamera(formData: FormData): Promise<Camera> {
    const { camera } = getEndpoints();
    const res = await fetch(camera, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async updateCamera(id: string, formData: FormData): Promise<Camera> {
    const { camera } = getEndpoints();
    const res = await fetch(`${camera}/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async deleteCamera(id: string): Promise<void> {
  const { camera } = getEndpoints();
  const res = await fetch(`${camera}/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  
  return;
},
};

export default CameraService;