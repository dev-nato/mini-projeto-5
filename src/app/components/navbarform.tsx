import { MdArrowBack } from 'react-icons/md'; // Importando o ícone de seta
import Link from 'next/link';


const NavbarSemBotao: React.FC = () => {
    return (
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <Link href="/" className="flex items-center text-white">
          <MdArrowBack size={24} className="mr-4" /> {/* Ícone de seta */}
          <h2 className="text-2xl font-bold">Atividades UFC</h2>
        </Link>
      </nav>
    );
  };
  
  export default NavbarSemBotao;
  