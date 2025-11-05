import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { Bird } from 'lucide-react';
import loginImage from '@/assets/login.png';

export default function Register() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/user/register', { name, email, password });
      setSuccess('Cadastro realizado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as any).message === 'string'
      ) {
        setError((err as { message: string }).message);
      } else {
        setError('Erro ao cadastrar usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Bird className="size-4" />
            </div>
            OnWay
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              onSubmit={(e) => {
                void handleSubmit(e);
              }}
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">Cadastro</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Preencha os campos para criar sua conta
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </Field>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                {success && (
                  <p className="text-green-600 text-sm text-center">
                    {success}
                  </p>
                )}
                <FieldDescription className="text-center mt-2">
                  Já tem uma conta?{' '}
                  <a href="/login" className="underline underline-offset-4">
                    Entrar
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={loginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
