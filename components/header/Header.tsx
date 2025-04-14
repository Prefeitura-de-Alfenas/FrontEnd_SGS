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
import { AlignJustify, LogOut, Menu } from "lucide-react";
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
  CommandShortcut,
} from "@/components/ui/command";
import Image from "next/image";

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
    <header className="flex items-center justify-between w-full h-28 bg-gray-50 mb-4 shadow-lg">
      <div className="ps-4">
        <Sheet>
          <SheetTrigger>
            {" "}
            <AlignJustify />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="mb-9 gap-1">
              <Avatar className="flex items-center justify-center m-auto mb-4 mt-9 w-24 h-24">
                <AvatarImage src="logoprefeitura.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-center">{usuarioLogado.user.nome}</h1>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Menu Basico">
                    <CommandItem>
                      <SheetClose asChild>
                        <Link href="/pessoas">Consulta Familia</Link>
                      </SheetClose>
                    </CommandItem>

                    <CommandItem>
                      <SheetClose asChild>
                        <Link href="/beneficios">Consulta Benefícios</Link>
                      </SheetClose>
                    </CommandItem>
                    {usuarioLogado && 
                      usuarioLogado.user?.role?.includes("admin") && (
                        <CommandItem>
                          <SheetClose asChild>
                            <Link href="/equipamentos">Consulta Equipamentos</Link>
                          </SheetClose>
                        </CommandItem>
                    )}
                    
                  </CommandGroup>

                  <CommandGroup heading="Relatorios">
                    <CommandItem>
                      <SheetClose asChild>
                        <Link href="/relatorios/pessoas/pessoapordata">
                          Relatorio de Familias
                        </Link>
                      </SheetClose>
                    </CommandItem>

                    <CommandItem>
                      <SheetClose asChild>
                        <Link href="/relatorios/entrega">
                          Relatorio Entregas
                        </Link>
                      </SheetClose>
                    </CommandItem>

                   
                  </CommandGroup>

                  <CommandSeparator />

                  {usuarioLogado.user.role.find(
                    (row: string) => row === "Admin"
                  ) && (
                    <CommandGroup heading="Administrador">
                      <CommandItem>
                        <SheetClose asChild>
                          <Link href="/admin">Consultas Familia Excluida</Link>
                        </SheetClose>
                      </CommandItem>
                      <CommandItem>
                        <SheetClose asChild>
                          <Link href="/usuarios">Consulta Operadores</Link>
                        </SheetClose>
                      </CommandItem>

                      <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
              <SheetTitle
                className="cursor-pointer flex items-center justify-start"
                onClick={logount}
              >
                <LogOut className="me-2 ms-2" />
                Logout
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div>Sistema de Gestão Social</div>
      <div className=" flex justify-center">
        <div className="h-14 w-14 overflow-hidden rounded-lg mr-4  flex items-center justify-center relative">
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
