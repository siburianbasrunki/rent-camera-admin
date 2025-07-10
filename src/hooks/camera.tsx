import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CameraService from "../service/camera";
import { useParams } from "react-router-dom";

export const useCamera = (searchTerm?: string) => {
  return useQuery({
    queryKey: ['cameras', searchTerm],
    queryFn: () => CameraService.getCameras(searchTerm),
  });
};

export const useCameraById = () => {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ['cameras', id],
    queryFn: () => {
      if (!id) throw new Error('No ID provided');
      return CameraService.getCameraById(id);
    },
    enabled: !!id,
  });
};
export const useCameraPhotos = () => {
  const { id: cameraId } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ['cameraPhotos', cameraId],
    queryFn: () => {
      if (!cameraId) throw new Error('No camera ID provided');
      return CameraService.getCameraPhotos(cameraId);
    },
    enabled: !!cameraId,
  });
};

export const useAddCameraPhoto = () => {
  const queryClient = useQueryClient();
  const { id: cameraId } = useParams<{ id: string }>();
  
  return useMutation({
    mutationFn: (formData: FormData) => {
      if (!cameraId) throw new Error('No camera ID provided');
      return CameraService.addCameraPhoto(cameraId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameraPhotos', cameraId] });
      queryClient.invalidateQueries({ queryKey: ['cameras', cameraId] });
    }
  });
};

export const useDeleteCameraPhoto = () => {
  const queryClient = useQueryClient();
  const { id: cameraId } = useParams<{ id: string }>();
  
  return useMutation({
    mutationFn: (photoId: string) => CameraService.deleteCameraPhoto(photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameraPhotos', cameraId] });
      queryClient.invalidateQueries({ queryKey: ['cameras', cameraId] });
    }
  });
};