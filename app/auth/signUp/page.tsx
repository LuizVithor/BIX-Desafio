"use client";

import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { auth } from "@/app/api/auth/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert, Typography, CircularProgress } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const schema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      toast.success("Usuário cadastrado com sucesso.");
      router.push("/auth/signIn");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Este email já está em uso.")
        setError("Este email já está em uso.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Email inválido.")
        setError("Email inválido.");
      } else if (error.code === "auth/weak-password") {
        toast.error("A senha deve ter no mínimo 6 caracteres.")
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else {
        toast.error("Erro ao registrar usuário. Tente novamente.")
        setError("Erro ao registrar usuário. Tente novamente.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 3,
        mt: 5,
        mx: "auto",
        width: "100%",
        maxWidth: 400,
        borderRadius: 2,
      }}
    >

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Nome"
        margin="normal"
        variant="outlined"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="Senha"
        type="password"
        margin="normal"
        variant="outlined"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        fullWidth
        label="Confirme a Senha"
        type="password"
        margin="normal"
        variant="outlined"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        fullWidth
        type="submit"
        sx={{ mt: 2 }}
        color="primary"
        variant="contained"
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress /> : "Cadastrar"}
      </Button>
    </Box>
  );
}
