import { useState } from "react";
import { Button, Typography, Box, Stack, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
  error?: string;
}

const ImageUpload = ({ onFileSelect, label = "Selecionar Imagem", error }: ImageUploadProps) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files?.[0];
    setFileName(file?.name);
    onFileSelect(file);
  };

  const handleRemove = () => {
    setFileName("");
    onFileSelect(null);
    const input = document.getElementById("image-upload-input") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <Box
      sx={{
        border: "2px dashed rgba(255,255,255,0.3)",
        borderRadius: 2,
        padding: 3,
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
      }}
    >
      {/* input escondido */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload-input"
        onChange={handleFileChange}
      />

      {/* botão de selecionar */}
      <label htmlFor="image-upload-input">
        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
          {label}
        </Button>
      </label>

      {/* nome do arquivo + lixeira */}
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mt={2}>
        {fileName ? (
          <>
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {fileName}
            </Typography>
            <IconButton size="small" color="error" onClick={handleRemove}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Nenhuma imagem selecionada
          </Typography>
        )}
      </Stack>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
