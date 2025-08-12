import backgroundLogin from '@/assets/background-login.jpg';
import { Card, CardContent, Typography, Button, TextField, Avatar, Box, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toastError } = useToast();

  async function autenticar() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        
        console.log('Usuário logado:', data.user);

      } else {
        const err = await res.json();
        toastError(err.message);
      }
    } catch (err) {
        toastError('Ocorreu um arro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(56, 56, 56, 0.9), rgba(56, 56, 56, 0.9)), url(${backgroundLogin})`,
      }}
    >
        <Card sx={{ width: 400, padding: 2 }}>
          <CardContent>
            <Box sx={{ marginBottom: 1, justifyItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, margin: 1 }}>
                <LockIcon />
              </Avatar>
              <Typography variant="h5" component="div">
                Login
              </Typography>
            </Box>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
              onClick={autenticar}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Entrar'
              )}
            </Button>
          </CardContent>
        </Card>
    </div>
  );
};

export default Login;