import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import type { AuthResponse } from '../types/auth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redireciona o usuário para o login social Google
  const handleGoogleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  // Autentica usuário convencional
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/auth/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  const data: AuthResponse = await res.json();
      if (res.ok) {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
        }
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'E-mail ou senha inválidos.');
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
        setError((err as { message: string }).message);
      } else {
        setError('Erro de conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={(e) => { void handleSubmit(e); }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Entrar na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu e-mail abaixo para acessar sua conta
          </p>
        </div>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Field>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Entrar com Google
          </Button>
          <FieldDescription className="text-center">
            Não tem uma conta?{' '}
            <a href="/register" className="underline underline-offset-4">
              Cadastre-se
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
