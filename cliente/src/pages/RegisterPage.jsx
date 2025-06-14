import { useState } from "react";
import { estadoAuth } from "../estados/estadoAuth";
import { Link } from "react-router";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

const RegisterPage = () => {
    const [showContraseña, setShowContraseña] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contraseña: "",
    });
    const { signup, isSigningUp } = estadoAuth();

    // Tras darle a crear cuenta
    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
                            >
                                <img src="/icono.png" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Crear Cuenta</h1>
                            <p className="text-base-content/60"></p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Username</span>
                            </label>
                            <div className="relative mt-3">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered border-1 rounded-md w-full pl-10`}
                                    placeholder="Renzo Quispe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative mt-3">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered border-1 rounded-md w-full pl-10`}
                                    placeholder="renzo@ejemplo.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative mt-3">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showContraseña ? "text" : "password"}
                                    className={`input input-bordered border-1 rounded-md w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formData.contraseña}
                                    onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowContraseña(!showContraseña)}
                                >
                                    {showContraseña ? (
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Crear cuenta"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" className="link link-primary bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                                Logearse
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;