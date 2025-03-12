"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string({
    required_error: "Email é obrigatorio",
    invalid_type_error: "Email tem que ser do tipo literal",
  }),
  senha: z.string().refine((val) => val.length >= 3, {
    message: "Senha tem que ter no minimo 3 caracteres",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.senha,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      toast({
        variant: "destructive",
        title: "Email ou Senha Incorreta",
      });
      return;
    }

    router.replace("/pessoas");
  };
  const onsubimitDev = async () => {
    const result = await signIn("credentials", {
      email: "marcelo.lima.gomes.23@gmail.com",
      password: "21872187",
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      toast({
        variant: "destructive",
        title: "Email ou Senha Incorreta",
      });
      return;
    }

    router.replace("/pessoas");
  };
  //Excluir em prod
  // useEffect(()=>{
  //   onsubimitDev()

  // },[])

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="h-32 w-32 overflow-hidden rounded-lg  flex items-center justify-center relative">
              <Image
                src="https://i.pinimg.com/1200x/2b/ac/f2/2bacf2e40c62c0a7c5ec7d9f811e4a92.jpg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Bem-vindo(a) à sua plataforma SGS
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Faça login para continuar
          </p>
        </div>

        <Card className="mt-8 overflow-hidden shadow-lg bg-white rounded-xl">
          <CardHeader className="pb-0" />
          <CardContent className=" flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className=" w-full ">
              <h2 className="text-center mb-3 font-bold text-2xl text-gray-800">
                Login
              </h2>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="mb-4  "
              />
              {errors.email?.message && <p>{errors.email?.message}</p>}

              <Input
                type="password"
                placeholder="Senha"
                {...register("senha")}
                className="mb-5"
              />
              {errors.senha?.message && <p>{errors.senha?.message}</p>}
              <div className="flex items-center justify-center">
                <Button className="bg-blue-600 text-white">Entrar</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a
              href="https://wa.me/5535984313982" // Substitua pelo seu número com código do país
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Entre em contato via WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
