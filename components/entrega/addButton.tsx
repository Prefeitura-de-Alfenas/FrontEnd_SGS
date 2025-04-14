import {  UserRoundPlus } from "lucide-react";
import Link from "next/link";
interface FiexedButtonProps{
  pessoaId:string
}

const FixedButtonEntrega = ({pessoaId}:FiexedButtonProps) => {
  return (
    <Link href={`/entrega/create/${pessoaId}`} className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg">
    
      <UserRoundPlus   className="text-lg" /> {/* Ícone de adição */}
    
    </Link>
  );
};

export default FixedButtonEntrega;