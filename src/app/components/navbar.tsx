'use client';

import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
      <h2 className="text-2xl font-bold">UFC</h2>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center gap-2"
        onClick={() => router.push('/formulario')}
      >
        <FaPlus size={15} />
        Atividade
      </button>
    </nav>
  );
};

export default Navbar;