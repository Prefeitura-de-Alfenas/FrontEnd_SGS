"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "@/components/ui/command"


interface TablePessoasProps{
  usuarioLogado:UsuarioLogadoI
}

const Header = ({usuarioLogado}:any) => {
  const router = useRouter();
  async function logount(){
    await signOut({
      redirect:false
    })
    router.replace('/')
  }
    return (
       <header className="flex items-center justify-between w-full h-28 bg-blue-900 mb-4">
        <div className="ps-4">
        <Sheet>
            <SheetTrigger>  <AlignJustify  /></SheetTrigger>
            <SheetContent side='left'>
            <SheetHeader className="mb-9 gap-1">
            <Avatar className="flex items-center justify-center m-auto mb-4 mt-9 w-24 h-24">
                <AvatarImage src="logoprefeitura.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-center">{usuarioLogado.user.nome}</h1>
            <Command >
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
                   
                  
                  <CommandItem>
                  <SheetClose asChild>
                    <Link href="/equipamentos">Consulta Equipamentos</Link>
                  </SheetClose>
                  </CommandItem>

             
                </CommandGroup>
                

                <CommandGroup heading="Relatorios">
                  
                  <CommandItem>
                  <SheetClose asChild>
                    <Link href="/relatorios/pessoas/pessoapordata">Relatorio de Familias</Link>
                  </SheetClose>
                  </CommandItem>
           
                  <CommandItem>
                  <SheetClose asChild>
                    <Link href="/relatorios/entrega">Relatorio Entregas</Link>
                  </SheetClose>
                  </CommandItem>
                   
                  
                  <CommandItem>
                  <SheetClose asChild>
                    <Link href="/equipamentos">Consulta Equipamentos</Link>
                  </SheetClose>
                  </CommandItem>

             
                </CommandGroup>

                <CommandSeparator />
         
                {usuarioLogado.user.role.find((row:string) => row === "Admin") && 
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
                }
              </CommandList>
            </Command>
            <SheetTitle className="cursor-pointer flex items-center justify-start" onClick={logount}><LogOut  className="me-2 ms-2"/>Logout</SheetTitle>
            </SheetHeader>
            </SheetContent>
        </Sheet>

        </div>
       
        <div>Sistema de Gestão Social</div>
        <div className="pe-4"><img src="logoprefeitura.png" alt="logo" className="w-14 h-14  rounded-full" /></div>
     
       </header>    

      );
}
 
export default Header;