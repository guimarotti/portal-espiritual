'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, SpiritualQuotesWithSuspense, BonusSectionWithSuspense, FooterWithSuspense, GuardianAngelSectionWithSuspense } from '../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../lib/locale';

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
    color: 'white',
    touchAction: 'manipulation',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '6rem 1rem 3rem',
    touchAction: 'manipulation',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontFamily: "'Playfair Display', serif",
    textAlign: 'center',
    marginBottom: '2rem',
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  button: {
    padding: '0.75rem 2rem',
    margin: '0 auto',
    display: 'block',
    background: 'linear-gradient(to right, #7B1FA2, #9C27B0)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    touchAction: 'manipulation',
  },
  resetButton: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    background: 'rgba(123, 31, 162, 0.3)',
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  footer: {
    width: '100%',
    padding: '1rem 0',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
  },
  divider: {
    width: '100%',
    maxWidth: '600px',
    height: '1px',
    margin: '3rem auto',
    background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent)',
  },
  videoContainer: {
    width: '100%',
    maxWidth: '64rem',
    marginTop: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
};

// Chave para armazenar o estado do vídeo no localStorage
const VIDEO_STATE_KEY = 'portalEspiritual_videoShown';

// Chave para verificar se o usuário já visitou os mantras do Li Wei
const LIWEI_VISITED_KEY = 'portalEspiritual_liweiVisited';

// Chave para verificar se o usuário já visitou o Ritual Relâmpago
const RITUAL_VISITED_KEY = 'portalEspiritual_ritualVisited';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState<boolean>(false);
  const [showDebugButton, setShowDebugButton] = useState<boolean>(false);
  const [hasVisitedLiWei, setHasVisitedLiWei] = useState<boolean>(false);
  const [hasVisitedRitual, setHasVisitedRitual] = useState<boolean>(false);

  // Get window size for responsive layouts
  const { width } = useWindowSize();
  const isMobile = width <= 600;

  // Referência para a div do vídeo
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Configuração de debug - mostrar botão de reset se clicar 5 vezes no footer
  const clickCountRef = useRef(0);

  // Efeito para configuração inicial
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());

    const handleFooterClick = () => {
      clickCountRef.current++;
      if (clickCountRef.current >= 5) {
        setShowDebugButton(true);
        clickCountRef.current = 0;
      }
    };

    const footer = document.querySelector('footer');
    if (footer) {
      footer.addEventListener('click', handleFooterClick);
    }

    // Recuperar o estado do vídeo do localStorage
    try {
      const savedVideoState = localStorage.getItem(VIDEO_STATE_KEY);
      if (savedVideoState === 'true') {
        setShowVideo(true);
      }

      // Verificar se o usuário já visitou os mantras do Li Wei
      const liweiVisited = localStorage.getItem(LIWEI_VISITED_KEY);
      if (liweiVisited === 'true') {
        setHasVisitedLiWei(true);
      }

      // Verificar se o usuário já visitou o Ritual Relâmpago
      const ritualVisited = localStorage.getItem(RITUAL_VISITED_KEY);
      if (ritualVisited === 'true') {
        setHasVisitedRitual(true);
      }
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
    }

    // Cleanup
    return () => {
      if (footer) {
        footer.removeEventListener('click', handleFooterClick);
      }
    };
  }, []);

  // Efeito para controlar o script do vídeo
  useEffect(() => {
    if (!showVideo || !videoContainerRef.current) return;

    // Limpar qualquer script existente
    const existingScripts = document.querySelectorAll('script[id^="scr_"]');
    existingScripts.forEach(script => script.remove());

    // Definir o ID do vídeo e Account ID
    const videoId = '69948a28736d0847a673ac56';
    const accountId = 'c90f7aac-d958-45ea-9216-c109249853cc';

    // Configurar o HTML do vídeo
    videoContainerRef.current.innerHTML = `
      <vturb-smartplayer id="vid-${videoId}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>
    `;

    // Adicionar o script
    const script = document.createElement('script');
    script.id = `scr_${videoId}`;
    script.type = 'text/javascript';
    script.innerHTML = `var s=document.createElement("script"); s.src="https://scripts.converteai.net/${accountId}/players/${videoId}/v4/player.js", s.async=!0,document.head.appendChild(s);`;
    document.body.appendChild(script);

    return () => {
      // Remover script ao desmontar
      const scriptToRemove = document.getElementById(`scr_${videoId}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [showVideo, locale]);

  // Manipulador para iniciar a leitura
  const handleStartReading = () => {
    try {
      localStorage.setItem(VIDEO_STATE_KEY, 'true');
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }

    setShowVideo(true);
  };

  // Função para resetar o vídeo (debug)
  const resetVideo = () => {
    try {
      localStorage.removeItem(VIDEO_STATE_KEY);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }

    setShowVideo(false);
    window.location.reload();
  };

  if (!mounted) return null;

  const translations = {
    pt: {
      title: "Bem-vindo ao Tarô dos Anjos",
      startReading: "Iniciar minha Leitura",
      resetButton: "Resetar Vídeo",
      liweiButton: "Acessar Mantras do Monge Li Wei",
      ritualButton: "Acessar Ritual Relâmpago",
      additionalContentTitle: "Conteúdo Adicional",
      additionalContentDescription: "Acesse nossas práticas espirituais especiais"
    },
    es: {
      title: "Bienvenido al Tarot de los Ángeles",
      startReading: "Iniciar mi Lectura",
      resetButton: "Resetear Video",
      liweiButton: "Acceder a los Mantras del Monje Li Wei",
      ritualButton: "Acceder al Ritual Relámpago",
      additionalContentTitle: "Contenido Adicional",
      additionalContentDescription: "Accede a nuestras prácticas espirituales especiales"
    },
    en: {
      title: "Welcome to Angel Tarot",
      startReading: "Start my Reading",
      resetButton: "Reset Video",
      liweiButton: "Access Li Wei Monk Mantras",
      ritualButton: "Access Lightning Ritual",
      additionalContentTitle: "Additional Content",
      additionalContentDescription: "Access our special spiritual practices"
    },
    fr: {
      title: "Bienvenue au Tarot des Anges",
      startReading: "Commencer ma Lecture",
      resetButton: "Réinitialiser la Vidéo",
      liweiButton: "Accéder aux Mantras du Moine Li Wei",
      ritualButton: "Accéder au Rituel Éclair",
      additionalContentTitle: "Contenu Supplémentaire",
      additionalContentDescription: "Accédez à nos pratiques spirituelles spéciales"
    }
  };

  const t = translations[locale];

  return (
    <main style={styles.container}>
      <NavbarWithSuspense />

      <div style={styles.contentContainer}>
        <motion.h1
          style={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h1>

        <motion.div
          style={{ width: '100%', maxWidth: '64rem', touchAction: 'manipulation' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {!showVideo && (<motion.button style={styles.button} whileHover={{ scale: 1.05, background: 'linear-gradient(to right, #D4AF37, #FFD700)' }} whileTap={{ scale: 0.95 }} onClick={handleStartReading}            >              {t.startReading}            </motion.button>)}

          {/* Vídeo renderizado diretamente na página principal */}
          {showVideo && (
            <div style={styles.videoContainer} ref={videoContainerRef} />
          )}

          {/* Seção "Conteúdo Adicional" para usuários que visitaram qualquer uma das páginas */}
          {showVideo && (hasVisitedLiWei || hasVisitedRitual) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                width: '100%',
                maxWidth: '48rem',
                margin: '2rem auto 1rem auto',
                padding: '1.5rem',
                background: 'rgba(21, 0, 34, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                border: '1px solid rgba(123, 31, 162, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow de fundo */}
              <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(123, 31, 162, 0.15), transparent 70%)',
                top: '-150px',
                right: '-150px',
                zIndex: 1,
                pointerEvents: 'none',
              }} />

              <h2 style={{
                fontSize: '1.5rem',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                zIndex: 2,
              }}>
                {t.additionalContentTitle}
              </h2>

              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 2,
              }}>
                {t.additionalContentDescription}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1rem',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
              }}>
                {/* Botão para os mantras do Monge Li Wei - Mostrar apenas se visitou a página Li Wei */}
                {hasVisitedLiWei && (
                  <motion.a
                    href="/liwei"
                    style={{
                      flex: 1,
                      padding: '0.85rem 1.2rem',
                      background: 'linear-gradient(135deg, rgba(123, 31, 162, 0.8), rgba(103, 21, 142, 0.9))',
                      color: '#FFD700',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(212, 175, 55, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.7rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(212, 175, 55, 0.2)',
                      textAlign: 'center',
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.4)',
                      border: '1px solid rgba(212, 175, 55, 0.8)',
                      color: '#FFDF00',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {t.liweiButton}
                  </motion.a>
                )}

                {/* Botão para o Ritual Relâmpago - Mostrar apenas se visitou a página Ritual Relâmpago */}
                {hasVisitedRitual && (
                  <motion.a
                    href="/ritual-relampago"
                    style={{
                      flex: 1,
                      padding: '0.85rem 1.2rem',
                      background: 'linear-gradient(135deg, rgba(123, 31, 162, 0.8), rgba(103, 21, 142, 0.9))',
                      color: '#FFD700',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(212, 175, 55, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.7rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(212, 175, 55, 0.2)',
                      textAlign: 'center',
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.4)',
                      border: '1px solid rgba(212, 175, 55, 0.8)',
                      color: '#FFDF00',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    {t.ritualButton}
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}

          {showVideo && (
            <>
              <motion.div
                style={styles.divider}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <BonusSectionWithSuspense locale={locale} />
              <div style={styles.divider} />
              <SpiritualQuotesWithSuspense />

              {/* Seção do Anjo da Guarda - Posicionada no final do portal */}
              {(locale === 'pt' || locale === 'es' || locale === 'en' || locale === 'fr') && (
                <GuardianAngelSectionWithSuspense locale={locale} />
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Substituir o rodapé atual pelo novo componente Footer */}
      <FooterWithSuspense showDebugButton={showDebugButton} onResetVideo={resetVideo} />
    </main>
  );
}