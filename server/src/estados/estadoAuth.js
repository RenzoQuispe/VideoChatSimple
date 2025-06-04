import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js"
import toast from "react-hot-toast";

const baseURL = "https://videochat.local/api";

export const estadoAuth = create((set, get) => ({  //get para una funcion de estadoAuth dentro de una funcion de estadoAuth
    authUser: null,
    isCheckingAuth: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingprofile: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Cuenta crada :D");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout correctamente :D");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logeao exitoso :D");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    actualizarperfil: async ({ id, username, contraseña }) => {
        try {
            const response = await axios.put(`http://localhost:3000/usuarios/${id}`, {
                username,
                contraseña,
            });

            set({ usuario: response.data.usuario });

            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Error en actualizarPerfil:', error.response?.data?.message || error.message);

            return {
                success: false,
                message: error.response?.data?.message || 'Error al actualizar perfil',
            };
        }
    },
})); 