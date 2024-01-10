"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlignJustify, Menu } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const Header = () => {
  const router = useRouter();
  async function logount(){
    await signOut({
      redirect:false
    })
    router.replace('/')
  }
    return (
       <header className="flex items-center justify-between w-full h-28 bg-indigo-900 mb-4">
        
        <div className="ps-4">Icone</div>
        <div>Nome Projeeto</div>
        <div className="pe-4">
        <Sheet>
            <SheetTrigger>  <AlignJustify  /></SheetTrigger>
            <SheetContent side='left'>
              <Avatar className="flex items-center justify-center m-auto mb-4 mt-9 w-24 h-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SheetHeader className="mb-9 gap-1">
               <Link href="/usuarios">Usuarios</Link>
               <Link href="/pessoas">Reponsaveis</Link>
               <Link href="/equipamentos">Equipamento</Link>
                <SheetTitle className="cursor-pointer" onClick={logount}>Logout</SheetTitle>
                <SheetDescription >
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                    This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
                <Separator className="h-1" />
            
              </SheetHeader>
              <div className="flex items-center justify-center">
              <SheetTitle>Suporte</SheetTitle>
              </div>
            </SheetContent>
        </Sheet>

        </div>
       </header>    

      );
}
 
export default Header;