import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const estadoSalas = create((set, get) => ({
    Salas : [],
    isSalasLoading: false,
    isCreandoSala: false,
    setIsCreandoSala: (estado) => set({ isCreandoSala: estado }),
    listarSalas : async () => {
        set({ isSalasLoading: true });
        try {
            const res = await axiosInstance.get("/sala/listar");
            console.log("info traida:",res.data)
            set({ Salas: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSalasLoading: false });
        }       
    }
})); 