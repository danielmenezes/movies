import backgroundLogin from '@/assets/background-login.jpg';
import { Card, CardContent, Typography, Button, TextField, Avatar, Box, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@config/api';
import { useToast } from '@/context/ToastProvider';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { toastError, toastSuccess } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthenticated } = useAuth();

  async function authenticate() {
    setLoading(true);
    try {
      const resp = await api.post('auth/login', { email, password });

      localStorage.setItem('access_token', resp.data?.body?.access_token);
      localStorage.setItem('refresh_token', resp.data?.body?.refresh_token);
      localStorage.setItem('user_name', resp.data?.body?.user);
      setAuthenticated(true);
      toastSuccess('Login realizado com sucesso!');
  
      navigate('/');

    } catch (err: any) {
      toastError(err.response?.data?.message);
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
              onClick={authenticate}
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