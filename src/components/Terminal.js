import React, { useState, useRef, useEffect } from 'react';
import CommandLine from './CommandLine';
import TypingEffect from './TypingEffect';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Bem-vindo ao meu portfólio! Digite "help" para ver os comandos disponíveis.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const commands = {
    help: () => `Comandos disponíveis:
    about     - Informações sobre mim
    skills    - Minhas habilidades técnicas
    projects  - Meus projetos
    contact   - Informações de contato
    clear     - Limpa o terminal
    help      - Mostra esta ajuda`,

    about: () => `Sobre mim:
    
    Olá! Eu sou Maike Heris do Amaral Belarmino, desenvolvedor full-stack e desenvolvedor de softwares, com paixão por criar soluções elegantes e eficientes.
    
    Com experiência em React, Node.js, Typescript e Python, busco sempre aprender e me adaptar às novas tendências do mercado.
    
    Estou sempre aberto a novos desafios e oportunidades de colaboração.`,

    skills: () => `Minhas habilidades:
    
    • Linguagens: JavaScript/TypeScript, Python, Rust
    • Front-end: React, HTML5, CSS3, SASS
    • Back-end: Node.js e Flask
    • Banco de dados: MySQL
    • Ferramentas: Git 
    • Outros: CI/CD, Testes automatizados, Scrum`,

    projects: () => `Meus projetos:
    
    • Sistema de Gerenciamento - Sistema completo de gestão empresarial desenvolvido com React e Node.js
    • Aplicativo Mobile - Aplicativo para delivery com interface intuitiva e funcionalidades avançadas
    • Plataforma E-learning - Plataforma de cursos online com sistema de avaliações e certificados`,

    contact: () => `Entre em contato:
    
    Email: maike.h.belarmino@gmail.com
    LinkedIn: linkedin.com/in/seu-perfil
    GitHub: github.com/Mr-maike`,

    clear: () => {
      setHistory([]);
      return null;
    }
  };

  const handleCommand = (command) => {
    setHistory(prev => [...prev, { type: 'command', content: command }]);
    
    const cmd = command.toLowerCase();
    if (commands[cmd]) {
      setIsTyping(true);
      const result = commands[cmd]();
      if (result) {
        setHistory(prev => [...prev, { type: 'output', content: result, isTyping: true }]);
      }
    } else {
      setHistory(prev => [...prev, { 
        type: 'output', 
        content: `Comando não encontrado: ${command}. Digite 'help' para ver os comandos disponíveis.` 
      }]);
    }
  };

  const handleTypingComplete = (index) => {
    setIsTyping(false);
    // Remove a flag de typing do item específico
    setHistory(prev => prev.map((item, i) => 
      i === index ? { ...item, isTyping: false } : item
    ));
  };

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">portfolio-terminal</div>
      </div>
      
      <div className="terminal-body">
        {history.map((item, index) => (
          <div key={index} className={item.type}>
            {item.type === 'command' ? (
              <div className="command-line">
                <span className="prompt">visitor@portfolio:~$</span>
                <span>{item.content}</span>
              </div>
            ) : item.isTyping ? (
              <div className="output">
                <TypingEffect 
                  text={item.content} 
                  onComplete={() => handleTypingComplete(index)}
                />
                <span className="cursor"></span>
              </div>
            ) : (
              <div className="output">{item.content}</div>
            )}
          </div>
        ))}
        
        <CommandLine onCommand={handleCommand} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default Terminal;