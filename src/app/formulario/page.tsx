'use client';

import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import Navbar from '../components/navbarform';

const Formulario: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [tituloProjeto, setTituloProjeto] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [matriculaError, setMatriculaError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Função para obter o último ID e incrementar
  const getNextId = () => {
    let lastId = parseInt(localStorage.getItem('lastId') || '0');
    lastId += 1;
    localStorage.setItem('lastId', lastId.toString());
    return lastId.toString();
  };

  // Função para validar a matrícula e limitar a 6 caracteres
  const handleMatriculaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números e limita a 6 caracteres
    if (/^\d{0,6}$/.test(value)) {
      setMatricula(value);
      setMatriculaError(''); // Limpa a mensagem de erro enquanto o usuário digita
    }
  };

  // Função para validar matrícula ao sair do campo
  const handleMatriculaBlur = () => {
    if (matricula.length !== 6) {
      setMatriculaError('Matrícula requer 6 dígitos');
    } else {
      setMatriculaError('');
    }
  };

  // Função para validar o e-mail e garantir que o domínio esteja correto
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validação de e-mail com qualquer domínio que termine em .com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!value) {
      setEmailError('O e-mail é obrigatório');
    } else if (!emailPattern.test(value)) {
      setEmailError('Digite um email válido com domínio @exemplo.com');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se a matrícula e o e-mail são válidos
    if (matricula.length !== 6 || emailError || !email) {
      return;
    }

    // Gerar o ID autoincrementado
    const id = getNextId();
    const novoProjeto = { id, matricula, email, tituloProjeto, detalhes };

    // Recuperar os projetos do localStorage ou criar um array vazio caso não exista
    const projetosExistentes = JSON.parse(localStorage.getItem('projetos') || '[]');

    // Adicionar o novo projeto aos projetos existentes
    projetosExistentes.push(novoProjeto);

    // Salvar a lista de projetos no localStorage
    localStorage.setItem('projetos', JSON.stringify(projetosExistentes));

    // Limpar o formulário
    setMatricula('');
    setEmail('');
    setTituloProjeto('');
    setDetalhes('');
    setSuccessMessage('Cadastro realizado com sucesso!');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleReset = () => {
    setMatricula('');
    setEmail('');
    setTituloProjeto('');
    setDetalhes('');
    setMatriculaError('');
    setEmailError('');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
        {successMessage && (
          <div className="bg-green-500 text-white text-center py-2 mb-4 rounded-md">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="matricula" className="text-sm font-bold text-black">Matrícula</label>
            <input
              type="text"
              id="matricula"
              value={matricula}
              onChange={handleMatriculaChange}
              onBlur={handleMatriculaBlur} // Chama a validação quando o usuário sai do campo
              className={`border border-solid rounded-md px-3 py-2 focus:outline-none text-black ${matriculaError ? 'border-red-500' : 'border-[rgba(0,0,0,0.3)]'}`}
              required
            />
            {matriculaError && <p className="text-red-500 text-sm">{matriculaError}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-black">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`border border-solid rounded-md px-3 py-2 focus:outline-none text-black ${emailError ? 'border-red-500' : 'border-[rgba(0,0,0,0.3)]'}`}
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className="flex flex-col">
              <label htmlFor="tituloProjeto" className="text-sm font-semibold text-black">Projeto/Atividade:</label>
              <input
                type="text"
                id="tituloProjeto"
                value={tituloProjeto}
                onChange={(e) => setTituloProjeto(e.target.value)}
                className="border border-solid border-[rgba(0,0,0,0.3)] rounded-md px-3 py-2 focus:outline-none focus:border-[rgba(0,0,0,0.3)] text-black"
                required // Aqui, o campo se torna obrigatório
              />
          </div>

          <div className="flex flex-col">
            <label htmlFor="detalhes" className="text-sm font-semibold text-black">Detalhes:</label>
            <textarea
              id="detalhes"
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              className="border border-solid border-[rgba(0,0,0,0.3)] rounded-md px-3 py-2 h-28 resize-none focus:outline-none focus:border-[rgba(0,0,0,0.3)] text-black"
            />
          </div>


          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              Cadastrar
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              Apagar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
