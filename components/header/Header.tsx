"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignJustify, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Image from "next/image";
import { Admin } from "@/utils/dataRole";
import QRCodeReader from "../qrcodereader/page";

interface TablePessoasProps {
  usuarioLogado: UsuarioLogadoI;
}

const Header = ({ usuarioLogado }: any) => {
  const router = useRouter();
  async function logount() {
    await signOut({
      redirect: false,
    });
    router.replace("/");
  }

  return (
    <header className="flex items-center justify-between w-full min-h-[5.5rem] bg-gray-50 mb-4 shadow-lg px-4">
      <div>
        <Sheet>
          <SheetTrigger className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <AlignJustify size={24} />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col h-full overflow-y-auto"
          >
            <SheetHeader className="mb-6 gap-1 flex flex-col items-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src="logoprefeitura.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-center font-semibold text-lg">
                {usuarioLogado.user.nome}
              </h1>
            </SheetHeader>

            <Command>
              <CommandInput placeholder="Digite um comando ou busque..." />
              <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

                <CommandGroup heading="Menu Básico">
                  <CommandItem>
                    <SheetClose asChild>
                      <Link href="/pessoas">Consulta Família</Link>
                    </SheetClose>
                  </CommandItem>
                  <CommandItem>
                    <SheetClose asChild>
                      <Link href="/beneficios">Consulta Benefícios</Link>
                    </SheetClose>
                  </CommandItem>
                  <CommandItem>
                    <SheetClose asChild>
                      <Link href="/entrega/avulsa">Atendimentos Avulso</Link>
                    </SheetClose>
                  </CommandItem>
                  {usuarioLogado &&
                    usuarioLogado.user?.role?.includes(Admin) && (
                      <CommandItem>
                        <SheetClose asChild>
                          <Link href="/equipamentos">
                            Consulta Equipamentos
                          </Link>
                        </SheetClose>
                      </CommandItem>
                    )}
                </CommandGroup>

                <CommandGroup heading="Relatórios">
                  <CommandItem>
                    <SheetClose asChild>
                      <Link href="/relatorios/rma">Relatório RMA</Link>
                    </SheetClose>
                  </CommandItem>
                  <CommandItem>
                    <SheetClose asChild>
                      <Link href="/relatorios/pessoas/pessoapordata">
                        Relatório de Famílias
                      </Link>
                    </SheetClose>
                  </CommandItem>
                  <CommandItem>
                    <SheetClose asChild>
                      <Link href="/relatorios/entrega">
                        Relatório Pendentes
                      </Link>
                    </SheetClose>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                {usuarioLogado.user.role.find(
                  (row: string) => row === Admin
                ) && (
                  <CommandGroup heading="Administrador">
                    <CommandItem>
                      <SheetClose asChild>
                        <Link href="/admin">Consultas Família Excluída</Link>
                      </SheetClose>
                    </CommandItem>
                    <CommandItem>
                      <SheetClose asChild>
                        <Link href="/usuarios">Consulta Operadores</Link>
                      </SheetClose>
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>

            <div className="mt-auto px-4 py-6 w-full">
              <QRCodeReader />
              <button
                onClick={logount}
                className="flex items-center justify-center gap-2 w-full text-red-600 hover:text-red-800 font-semibold mt-4 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                type="button"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-xl font-semibold truncate max-w-[60%] text-center">
        Sistema de Gestão Social
      </div>

      <div className="flex justify-center items-center">
        <div className="h-14 w-14 overflow-hidden rounded-lg relative">
          <Image
            src="https://i.pinimg.com/1200x/2b/ac/f2/2bacf2e40c62c0a7c5ec7d9f811e4a92.jpg"
            alt="logo"
            className="rounded-2xl object-contain"
            fill
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
