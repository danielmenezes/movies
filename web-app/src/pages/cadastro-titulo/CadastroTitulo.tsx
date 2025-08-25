import api from "@/config/api";
import { useLoad } from "@/context/LoadingProvider";
import { useToast } from "@/context/ToastProvider";
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Title {
  title: string;
  description?: string;
  type: 'movie' | 'serie';
  releaseYear?: number;
}

const CadastroTitulo = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoad();
  const { toastError, toastSuccess } = useToast();
  
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<Title>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      type: 'movie',
      releaseYear: undefined,
    },
  });

  const onSubmit = async (data: Title) => {
    try {
      startLoading('Salvando...');
      const payload = {
        ...data,
        releaseYear: data.releaseYear ? Number(data.releaseYear) : undefined,
      };
      await api.post('titles', payload);
      reset();
      toastSuccess('Title cadastrado com sucesso!');
      navigate('/');
    } catch (err: any) {
      toastError(err.response?.data?.message || 'Erro ao cadastrar title');
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-white">
      <Card
        sx={{
          padding: 2,
          marginTop: 4,
          borderRadius: 2,
          maxWidth: 600,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Titulo"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("title", { required: "O título é obrigatório" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            {...register("description")}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="type-label">Tipo</InputLabel>
            <Controller
              name="type"
              control={control}
              rules={{ required: "O tipo é obrigatório" }}
              render={({ field }) => (
                <Select {...field} labelId="type-label" label="type">
                  <MenuItem value="movie">Filme</MenuItem>
                  <MenuItem value="serie">Série</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <TextField
            label="Ano de Lançamento"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("releaseYear", { min: { value: 1800, message: "Ano inválido" }, max: { value: 2100, message: "Ano inválido" } })}
            error={!!errors.releaseYear}
            helperText={errors.releaseYear?.message}
          />

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
    </div>
  );
};

export default CadastroTitulo;
