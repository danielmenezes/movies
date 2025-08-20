import api from "@/config/api";
import { useToast } from "@/context/ToastProvider";
import { Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
  name: string;
  profileId: number;
  status: number;
}

const CadastroUsuario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toastError, toastSuccess } = useToast();
  
  const { register, handleSubmit, reset, control, formState: { errors, isValid } } = useForm<User>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      profileId: 2,
      status: 1,  
    },

  });

  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      await api.post('users', data);
      reset();
      toastSuccess('Usuário cadastrado com sucesso!');
      navigate('/');

    } catch (err: any) {
      toastError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-white">
      <Card
        sx={{
          padding: 2,
          marginTop: 4,
          borderRadius: 2,
          maxWidth: 800,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            margin="normal"
            autoComplete="new-email" 
            {...register("email", { required: true })}
            error={!!errors.email}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="new-password"
            {...register("password", { 
                required: true,
                minLength: { value: 8, message: "Senha deve ter no mínimo 8 caracteres" }, 
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Nome"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="off"
            {...register("name", { 
              required: true,
              minLength: { value: 3, message: "Nome deve ter no mínimo 3 caracteres" }, 
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="perfil-label">Perfil</InputLabel>
            <Controller
              name="profileId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} labelId="perfil-label" label="Perfil">
                  <MenuItem value={2}>Usuário</MenuItem>
                  <MenuItem value={1}>Administrador</MenuItem>
                </Select>
              )}
            />
            
          </FormControl>

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="status-label">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} labelId="status-label" label="Status">
                  <MenuItem value={1}>Ativo</MenuItem>
                  <MenuItem value={0}>Inativo</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </Card>

      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <CircularProgress color="inherit" />
        </div>
      )}
    </div>
  );
};

export default CadastroUsuario;
