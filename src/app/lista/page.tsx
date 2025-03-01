'use client';

import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import Navbar from '../components/navbarform';

const Listagem: React.FC = () => {
  const [projetos, setProjetos] = useState<{ id: string; matricula: string; tituloProjeto: string; detalhes: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [selectedProject, setSelectedProject] = useState<{ id: string; matricula: string; tituloProjeto: string; detalhes: string } | null>(null); // Projeto selecionado para editar

  // Carregar os projetos do localStorage
  useEffect(() => {
    const projetosSalvos = JSON.parse(localStorage.getItem('projetos') || '[]');
    setProjetos(projetosSalvos);
  }, []);

  // Função para excluir um projeto
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este projeto?');
    if (confirmDelete) {
      const projetosAtualizados = projetos.filter(projeto => projeto.id !== id);
      localStorage.setItem('projetos', JSON.stringify(projetosAtualizados));
      setProjetos(projetosAtualizados);
    }
  };

  // Função para exibir o modal com os dados do projeto
  const handleView = (id: string) => {
    const projeto = projetos.find((projeto) => projeto.id === id);
    if (projeto) {
      setSelectedProject(projeto);
      setIsModalOpen(true); // Abre o modal
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null); // Limpa os dados do projeto
  };

  // Função para salvar as alterações do projeto
  const handleSave = (updatedProject: { id: string; matricula: string; tituloProjeto: string; detalhes: string }) => {
    const projetosAtualizados = projetos.map(projeto =>
      projeto.id === updatedProject.id ? updatedProject : projeto
    );
    localStorage.setItem('projetos', JSON.stringify(projetosAtualizados));
    setProjetos(projetosAtualizados);
    closeModal();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-center text-black mb-4">Lista de Projetos</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-6 py-3 text-left text-sm font-semibold text-white-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white-600">Matrícula</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white-600">Projeto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{projeto.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{projeto.matricula}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{projeto.tituloProjeto}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleView(projeto.id)}  // Exibe o modal com os dados do projeto
                    className="bg-blue-500 text-white py-2 px-4 rounded text-sm font-medium"
                  >
                    <FaEye size={16} className="inline-block mr-1" />
                    Ver
                  </button>
                  <button
                    onClick={() => handleDelete(projeto.id)}  // Exclui o projeto
                    className="bg-red-500 text-white py-2 px-4 rounded text-sm font-medium"
                  >
                    <FaTrash size={16} className="inline-block mr-1" />
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição do Projeto */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl text-blue-500 font-bold mb-4">Editar Projeto</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(selectedProject); // Salva as alterações
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  value={selectedProject.id}
                  readOnly
                  className="w-full p-2 mt-1 border-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Matrícula</label>
                <input
                  type="text"
                  value={selectedProject.matricula}
                  onChange={(e) => setSelectedProject({ ...selectedProject, matricula: e.target.value })}
                  className="w-full p-2 mt-1 border-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Título do Projeto</label>
                <input
                  type="text"
                  value={selectedProject.tituloProjeto}
                  onChange={(e) => setSelectedProject({ ...selectedProject, tituloProjeto: e.target.value })}
                  className="w-full p-2 mt-1 border-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Detalhes</label>
                <textarea
                  value={selectedProject.detalhes}
                  onChange={(e) => setSelectedProject({ ...selectedProject, detalhes: e.target.value })}
                  className="w-full p-2 mt-1 border-2 text-black rounded"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listagem;
