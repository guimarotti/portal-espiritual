'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';
import { BsSend } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'celestino';
  timestamp: Date;
}

interface ChatResponse {
  message: string;
}

const styles: Record<string, CSSProperties> = {
  container: {
    height: '100dvh', // Dynamic viewport height para mobile
    width: '100vw',
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr auto',
    gridTemplateAreas: `
      "navbar"
      "header"
      "messages"
      "input"
    `,
    background: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
    color: 'white',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navbarArea: {
    gridArea: 'navbar',
    zIndex: 1004,
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
    padding: '16px 0',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    marginBottom: '16px',
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  headerArea: {
    gridArea: 'header',
    background: 'rgba(21, 0, 34, 0.95)',
    borderBottom: '1px solid rgba(123, 31, 162, 0.4)',
    padding: '16px 20px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
    zIndex: 1003,
    position: 'relative',
  },
  messagesArea: {
    gridArea: 'messages',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: 'linear-gradient(to bottom, rgba(21, 0, 34, 0.3), rgba(74, 0, 114, 0.2))',
    padding: '16px 20px',
    minHeight: 0,
    WebkitOverflowScrolling: 'touch', // Scroll suave no iOS
  },
  message: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    maxWidth: '85%',
    marginBottom: '4px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
  },
  celestinoMessage: {
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  messageAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  userAvatar: {
    background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
    color: 'white',
  },
  celestinoAvatar: {
    background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    color: '#150022',
  },
  messageBubble: {
    padding: '12px 16px',
    borderRadius: '18px 18px 4px 18px',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    wordWrap: 'break-word',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '100%',
  },
  userBubble: {
    background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
    color: 'white',
    borderRadius: '18px 4px 18px 18px',
    marginLeft: '8px',
  },
  celestinoBubble: {
    background: 'rgba(212, 175, 55, 0.15)',
    border: '1px solid rgba(212, 175, 55, 0.4)',
    color: 'rgba(255, 255, 255, 0.95)',
    marginRight: '8px',
  },
  inputArea: {
    gridArea: 'input',
    padding: '16px 20px',
    paddingBottom: 'max(20px, env(safe-area-inset-bottom))', // Safe area para iPhone
    borderTop: '1px solid rgba(123, 31, 162, 0.4)',
    background: 'rgba(21, 0, 34, 0.98)',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.4)',
    zIndex: 1002,
    position: 'relative',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
    maxWidth: '100%',
    margin: '0 auto',
    width: '100%',
  },
  input: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: '28px',
    border: '1px solid rgba(123, 31, 162, 0.6)',
    background: 'rgba(21, 0, 34, 0.9)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    resize: 'none',
    minHeight: '48px',
    maxHeight: '120px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Inter, sans-serif',
  },
  sendButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    border: 'none',
    color: '#150022',
    fontSize: '1.3rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    flexShrink: 0,
    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.5)',
  },
  sendButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  nameModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  nameModalContent: {
    background: 'linear-gradient(135deg, rgba(21, 0, 34, 0.95), rgba(74, 0, 114, 0.9))',
    padding: '32px',
    borderRadius: '20px',
    border: '1px solid rgba(123, 31, 162, 0.5)',
    backdropFilter: 'blur(20px)',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  },
  nameModalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#D4AF37',
  },
  nameModalText: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  nameInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(123, 31, 162, 0.5)',
    background: 'rgba(21, 0, 34, 0.8)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: '20px',
  },
  nameButton: {
    padding: '12px 24px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    border: 'none',
    color: '#150022',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  loadingMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
  },
  typingDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#D4AF37',
    animation: 'typing 1.4s infinite ease-in-out',
  },
};

const API_URL = '/api/celestino';
const USER_NAME_KEY = 'celestino_chat_user_name';
const USER_ID_KEY = 'celestino_chat_user_id';
const MESSAGES_KEY = 'celestino_chat_messages';

// Função para gerar um user_id único
const generateUserId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `user_${timestamp}_${random}`;
};

export default function CelestinoPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Função para ajustar altura da viewport em mobile
  const updateViewportHeight = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(`${window.innerHeight}px`);
    }
  };

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());

    // Detectar se é mobile e ajustar viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      updateViewportHeight();
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', updateViewportHeight);

    // Ajustar viewport height para mobile (corrige problema de teclado virtual)
    updateViewportHeight();

    // Verificar se o usuário já tem ID salvo, se não, gerar um novo
    let savedUserId = localStorage.getItem(USER_ID_KEY);
    if (!savedUserId) {
      savedUserId = generateUserId();
      localStorage.setItem(USER_ID_KEY, savedUserId);
    }
    setUserId(savedUserId);

    // Verificar se o usuário já tem nome salvo
    const savedName = localStorage.getItem(USER_NAME_KEY);
    if (savedName) {
      setUserName(savedName);
      // Não adicionar mensagem inicial - chat começa vazio
    } else {
      setShowNameModal(true);
    }

    // Carregar mensagens salvas do localStorage
    try {
      const savedMessages = localStorage.getItem(MESSAGES_KEY);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Converter timestamps de string para Date
        const messagesWithDates = parsedMessages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens do localStorage:', error);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Scroll para o final quando o componente monta
    if (mounted && messages.length > 0) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [mounted, messages.length]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };





  const handleNameSubmit = () => {
    if (tempName.trim()) {
      const name = tempName.trim();
      setUserName(name);
      localStorage.setItem(USER_NAME_KEY, name);
      setShowNameModal(false);
      // Não adicionar mensagem inicial - chat começa vazio
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isWaitingResponse) return;

    // Bloquear chat imediatamente após envio
    setIsWaitingResponse(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      // Salvar mensagens no localStorage
      try {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMessages));
      } catch (error) {
        console.error('Erro ao salvar mensagens no localStorage:', error);
      }
      return newMessages;
    });
    setInputMessage('');

    // Delay aleatório entre 5 a 20 segundos antes de mostrar "digitando"
    const randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;

    setTimeout(() => {
      setIsLoading(true);
    }, randomDelay);

    // Delay aleatório adicional antes de processar a resposta
    const processingDelay = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;

    setTimeout(async () => {
      try {
        // Converter código do idioma para nome completo
        const getLanguageName = (locale: Locale) => {
          const languageNames = {
            pt: 'Português (Brasil)',
            es: 'Espanhol',
            en: 'Inglês',
            fr: 'Francês'
          };
          return languageNames[locale];
        };

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage.text,
            userName: userName,
            userId: userId,
            language: getLanguageName(locale),
          }),
        });

        if (!response.ok) {
          throw new Error('Falha na comunicação');
        }

        const data: ChatResponse = await response.json();

        const responseText = data.message || getErrorMessage();

        // Dividir mensagem por quebras de linha se existirem
        const messageParts = responseText.split('\n').filter(part => part.trim() !== '');

        // Se há múltiplas partes, criar mensagens separadas
        if (messageParts.length > 1) {
          for (let i = 0; i < messageParts.length; i++) {
            const part = messageParts[i].trim();
            if (part) {
              // Calcular delay baseado no tamanho da parte
              const messageLength = part.length;
              const baseDelay = 1000; // 1 segundo base
              const delayPerChar = 30; // 30ms por caractere
              const totalDelay = Math.min(baseDelay + (messageLength * delayPerChar), 20000);

              // Delay adicional entre mensagens (2-4 segundos)
              const betweenMessagesDelay = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
              const finalDelay = i === 0 ? totalDelay : totalDelay + betweenMessagesDelay;

              // Aguardar o delay antes de mostrar cada parte
              await new Promise(resolve => setTimeout(resolve, finalDelay));

              const celestinoMessage: Message = {
                id: `${Date.now()}_${i}`,
                text: part,
                sender: 'celestino',
                timestamp: new Date(),
              };

              setMessages(prev => {
                const newMessages = [...prev, celestinoMessage];
                // Salvar mensagens no localStorage
                try {
                  localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMessages));
                } catch (error) {
                  console.error('Erro ao salvar mensagens no localStorage:', error);
                }
                return newMessages;
              });
            }
          }
        } else {
          // Mensagem única (sem quebras de linha)
          const messageLength = responseText.length;
          const baseDelay = 1000; // 1 segundo base
          const delayPerChar = 30; // 30ms por caractere
          const totalDelay = Math.min(baseDelay + (messageLength * delayPerChar), 20000);

          // Aguardar o delay antes de mostrar a resposta
          await new Promise(resolve => setTimeout(resolve, totalDelay));

          const celestinoMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: 'celestino',
            timestamp: new Date(),
          };

          setMessages(prev => {
            const newMessages = [...prev, celestinoMessage];
            // Salvar mensagens no localStorage
            try {
              localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMessages));
            } catch (error) {
              console.error('Erro ao salvar mensagens no localStorage:', error);
            }
            return newMessages;
          });
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);

        const errorText = getErrorMessage();

        // Calcular delay para mensagem de erro também
        const messageLength = errorText.length;
        const baseDelay = 1000;
        const delayPerChar = 30;
        const totalDelay = Math.min(baseDelay + (messageLength * delayPerChar), 8000);

        await new Promise(resolve => setTimeout(resolve, totalDelay));

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: errorText,
          sender: 'celestino',
          timestamp: new Date(),
        };

        setMessages(prev => {
          const newMessages = [...prev, errorMessage];
          // Salvar mensagens no localStorage
          try {
            localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMessages));
          } catch (error) {
            console.error('Erro ao salvar mensagens no localStorage:', error);
          }
          return newMessages;
        });
      } finally {
        setIsLoading(false);
        setIsWaitingResponse(false); // Liberar chat após resposta
      }
    }, processingDelay);
  };

  const getErrorMessage = () => {
    const messages = {
      pt: 'Desculpe, estou com dificuldades para responder no momento. Tente novamente em alguns instantes. 🙏',
      es: 'Disculpa, tengo dificultades para responder en este momento. Inténtalo de nuevo en unos momentos. 🙏',
      en: 'Sorry, I\'m having trouble responding right now. Please try again in a few moments. 🙏',
      fr: 'Désolé, j\'ai des difficultés à répondre en ce moment. Veuillez réessayer dans quelques instants. 🙏',
    };
    return messages[locale];
  };



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };



  if (!mounted) return null;

  const translations = {
    pt: {
      title: 'Chat com Celestino',
      subtitle: 'Converse diretamente com seu mentor espiritual e receba orientações personalizadas para sua jornada',
      placeholder: 'Digite sua mensagem...',
      nameModalTitle: 'Bem-vindo ao Chat Espiritual',
      nameModalText: 'Para uma experiência mais personalizada, por favor nos diga seu nome:',
      nameInputPlaceholder: 'Seu nome',
      nameButtonText: 'Começar Conversa',
      typing: 'Celestino está digitando...',
    },
    es: {
      title: 'Chat con Celestino',
      subtitle: 'Conversa directamente con tu mentor espiritual y recibe orientaciones personalizadas para tu jornada',
      placeholder: 'Escribe tu mensaje...',
      nameModalTitle: 'Bienvenido al Chat Espiritual',
      nameModalText: 'Para una experiencia más personalizada, por favor dinos tu nombre:',
      nameInputPlaceholder: 'Tu nombre',
      nameButtonText: 'Comenzar Conversación',
      typing: 'Celestino está escribiendo...',
    },
    en: {
      title: 'Chat with Celestino',
      subtitle: 'Talk directly with your spiritual mentor and receive personalized guidance for your journey',
      placeholder: 'Type your message...',
      nameModalTitle: 'Welcome to Spiritual Chat',
      nameModalText: 'For a more personalized experience, please tell us your name:',
      nameInputPlaceholder: 'Your name',
      nameButtonText: 'Start Conversation',
      typing: 'Celestino is typing...',
    },
    fr: {
      title: 'Chat avec Celestino',
      subtitle: 'Parlez directement avec votre mentor spirituel et recevez des conseils personnalisés pour votre parcours',
      placeholder: 'Tapez votre message...',
      nameModalTitle: 'Bienvenue au Chat Spirituel',
      nameModalText: 'Pour une expérience plus personnalisée, veuillez nous dire votre nom :',
      nameInputPlaceholder: 'Votre nom',
      nameButtonText: 'Commencer la Conversation',
      typing: 'Celestino est en train d\'écrire...',
    },
  };

  const t = translations[locale];

  return (
    <main style={{
      ...styles.container,
      height: isMobile ? viewportHeight : '100vh',
    }}>
      {/* Navbar Area */}
      <div style={styles.navbarArea}>
        <NavbarWithSuspense />
      </div>

      {/* Header Area */}
      <motion.div
        style={styles.headerArea}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '100%',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <motion.div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundImage: 'url(/images/IMG_8416.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '2px solid #D4AF37',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
            </motion.div>
            <div>
              <h1 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#D4AF37',
                margin: 0,
                lineHeight: '1.2',
              }}>
                {locale === 'pt' ? 'Celestino' :
                  locale === 'es' ? 'Celestino' :
                    locale === 'en' ? 'Celestino' :
                      'Celestino'}
              </h1>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
              }}>
                {locale === 'pt' ? 'Mentor Espiritual' :
                  locale === 'es' ? 'Mentor Espiritual' :
                    locale === 'en' ? 'Spiritual Mentor' :
                      'Mentor Spirituel'}
              </p>
            </div>
          </div>

          {/* Status online */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#4CAF50',
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4CAF50',
              boxShadow: '0 0 8px #4CAF50',
            }} />
            {locale === 'pt' ? 'Online' :
              locale === 'es' ? 'En línea' :
                locale === 'en' ? 'Online' :
                  'En ligne'}
          </motion.div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <motion.div
        style={{
          ...styles.messagesArea,
          padding: isMobile ? '16px' : '20px 40px',
          maxWidth: isMobile ? '100%' : '800px',
          margin: '0 auto',
          width: '100%',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              style={{
                ...styles.message,
                ...(message.sender === 'user' ? styles.userMessage : styles.celestinoMessage),
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: message.sender === 'celestino' ? 0.1 : 0
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                style={{
                  ...styles.messageAvatar,
                  ...(message.sender === 'user' ? styles.userAvatar : {
                    ...styles.celestinoAvatar,
                    backgroundImage: 'url(/images/IMG_8416.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }),
                }}
              >
                {message.sender === 'user' ? <FaUser /> : null}
              </div>
              <div
                style={{
                  ...styles.messageBubble,
                  ...(message.sender === 'user' ? styles.userBubble : styles.celestinoBubble),
                }}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            style={{
              ...styles.message,
              ...styles.celestinoMessage,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div
              style={{
                ...styles.messageAvatar,
                ...styles.celestinoAvatar,
                backgroundImage: 'url(/images/IMG_8416.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
            </div>
            <motion.div
              style={{
                ...styles.loadingMessage,
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.15))',
                backgroundSize: '200% 100%',
                padding: '12px 16px',
                borderRadius: '18px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <span>{t.typing}</span>
              <div style={{
                ...styles.typingIndicator,
                marginLeft: '8px',
              }}>
                <motion.div
                  style={{
                    ...styles.typingDot,
                    background: '#D4AF37',
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <motion.div
                  style={{
                    ...styles.typingDot,
                    background: '#D4AF37',
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  style={{
                    ...styles.typingDot,
                    background: '#D4AF37',
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        <div
          ref={messagesEndRef}
          style={{
            height: '20px',
            flexShrink: 0
          }}
        />
      </motion.div>

      {/* Input Area */}
      <div style={styles.inputArea}>
        <div style={{
          ...styles.inputContainer,
          maxWidth: isMobile ? '100%' : '800px',
          margin: '0 auto',
        }}>
          <textarea
            style={{
              ...styles.input,
              borderColor: inputMessage.trim() ? 'rgba(212, 175, 55, 0.8)' : 'rgba(123, 31, 162, 0.6)',
              boxShadow: inputMessage.trim() ? '0 4px 20px rgba(212, 175, 55, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
            }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isWaitingResponse ? (locale === 'pt' ? 'Aguardando resposta...' : locale === 'es' ? 'Esperando respuesta...' : locale === 'en' ? 'Waiting for response...' : 'En attente de réponse...') : t.placeholder}
            disabled={isLoading || isWaitingResponse}
            rows={1}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(212, 175, 55, 1)';
              e.target.style.boxShadow = '0 6px 24px rgba(212, 175, 55, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = inputMessage.trim() ? 'rgba(212, 175, 55, 0.8)' : 'rgba(123, 31, 162, 0.6)';
              e.target.style.boxShadow = inputMessage.trim() ? '0 4px 20px rgba(212, 175, 55, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          <motion.button
            style={{
              ...styles.sendButton,
              ...((!inputMessage.trim() || isLoading || isWaitingResponse) ? styles.sendButtonDisabled : {}),
            }}
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading || isWaitingResponse}
            whileHover={{ scale: inputMessage.trim() && !isLoading && !isWaitingResponse ? 1.05 : 1 }}
            whileTap={{ scale: inputMessage.trim() && !isLoading && !isWaitingResponse ? 0.95 : 1 }}
          >
            <BsSend />
          </motion.button>
        </div>
      </div>



      {/* Modal para capturar nome do usuário */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            style={styles.nameModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              style={styles.nameModalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={styles.nameModalTitle}>{t.nameModalTitle}</h2>
              <p style={styles.nameModalText}>{t.nameModalText}</p>
              <input
                type="text"
                style={styles.nameInput}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder={t.nameInputPlaceholder}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleNameSubmit();
                  }
                }}
                autoFocus
              />
              <motion.button
                style={styles.nameButton}
                onClick={handleNameSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!tempName.trim()}
              >
                {t.nameButtonText}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  );
}