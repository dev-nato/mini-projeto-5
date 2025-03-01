'use client';
import Navbar from './components/navbar';
import { FaSearch } from 'react-icons/fa';
import { FaEraser } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [matricula, setMatricula] = useState('');
  const [alerta, setAlerta] = useState(''); // Estado para o alerta de falha

  const handleMatriculaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Garantir que a matrícula não tenha mais do que 6 caracteres
    if (event.target.value.length <= 6) {
      setMatricula(event.target.value);
      setAlerta(''); // Limpa o alerta toda vez que o valor da matrícula muda
    }
  };

  const buscarAtividades = () => {
    const atividades = JSON.parse(localStorage.getItem('atividades') || '[]');

    // Verifica se há atividades cadastradas e se a matrícula digitada está presente
    const atividadesFiltradas = atividades.filter((atividade: any) => atividade.matricula === matricula);

    if (matricula.trim() === '') {
      // Se a matrícula estiver vazia, redireciona para a página de listagem sem filtro
      router.push('/lista');
    } else if (atividadesFiltradas.length === 0) {
      // Se não houver atividade cadastrada com essa matrícula, exibe o alerta de falha
      setAlerta('Não há atividades salvas com essa matrícula');
    } else {
      // Se a matrícula for encontrada, redireciona para a página de listagem filtrada
      setAlerta(''); // Limpa o alerta se a matrícula for válida
      router.push(`/lista?matricula=${matricula}`);
    }
  };

  const limparCampos = () => {
    setMatricula('');
    setAlerta(''); // Limpa o alerta ao limpar os campos
  };

  return (
    <div className="h-screen m-0 p-0 overflow-hidden bg-gray-300">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20 px-5">
        {/* Alerta de falha, se houver */}
        {alerta && (
          <div className="bg-red-600 text-white text-center py-2 mb-4 w-full">
            {alerta}
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-black mb-4">Sistema de Gestão de Atividades</h2>
        
        

        <div className="flex gap-2 mt-2">
          <button 
            className="px-5 py-2 text-base font-bold bg-green-500 text-white rounded-md hover:bg-green-700"
            onClick={() => router.push('/lista')}
          >
            Listar Atividades
          </button>
        </div>
      </div>
    </div>
  );
}
