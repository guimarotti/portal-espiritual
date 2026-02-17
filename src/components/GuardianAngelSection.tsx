'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsStars, BsFillPlayFill } from 'react-icons/bs';
import { GiAngelWings } from 'react-icons/gi';

interface GuardianAngelSectionProps {
  locale: 'pt' | 'es' | 'en' | 'fr';
}

const GuardianAngelSection: React.FC<GuardianAngelSectionProps> = ({ locale }) => {
  const [isHovered, setIsHovered] = useState(false);

  const translations = {
    pt: {
      title: "Descubra Seu Anjo da Guarda",
      subtitle: "Uma jornada espiritual única para você",
      description: "Conecte-se com seu protetor celestial e receba orientações personalizadas para sua vida espiritual",
      features: [
        "✨ Revelação do seu Anjo pessoal",
        "🔮 Mensagem exclusiva do seu Anjo",
        "🛡️ Proteção espiritual personalizada",
        "💫 Orientações para sua jornada"
      ],
      buttonText: "Descobrir Meu Anjo",
      testimonialText: "\"Descobrir meu anjo mudou completamente minha perspectiva espiritual\"",
      urgencyText: "Experiência Personalizada"
    },
    es: {
      title: "Descubre Tu Ángel de la Guarda",
      subtitle: "Un viaje espiritual único para ti",
      description: "Conéctate con tu protector celestial y recibe orientaciones personalizadas para tu vida espiritual",
      features: [
        "✨ Revelación de tu Ángel personal",
        "🔮 Mensaje exclusivo de tu Ángel",
        "🛡️ Protección espiritual personalizada",
        "💫 Orientaciones para tu viaje"
      ],
      buttonText: "Descubrir Mi Ángel",
      testimonialText: "\"Descubrir mi ángel cambió completamente mi perspectiva espiritual\"",
      urgencyText: "Experiencia Personalizada"
    },
    en: {
      title: "Discover Your Guardian Angel",
      subtitle: "A unique spiritual journey for you",
      description: "Connect with your celestial protector and receive personalized guidance for your spiritual life",
      features: [
        "✨ Revelation of your personal Angel",
        "🔮 Exclusive message from your Angel",
        "🛡️ Personalized spiritual protection",
        "💫 Guidance for your journey"
      ],
      buttonText: "Discover My Angel",
      testimonialText: "\"Discovering my angel completely changed my spiritual perspective\"",
      urgencyText: "Personalized Experience"
    },
    fr: {
      title: "Découvrez Votre Ange Gardien",
      subtitle: "Un voyage spirituel unique pour vous",
      description: "Connectez-vous avec votre protecteur céleste et recevez des conseils personnalisés pour votre vie spirituelle",
      features: [
        "✨ Révélation de votre Ange personnel",
        "🔮 Message exclusif de votre Ange",
        "🛡️ Protection spirituelle personnalisée",
        "💫 Conseils pour votre voyage"
      ],
      buttonText: "Découvrir Mon Ange",
      testimonialText: "\"Découvrir mon ange a complètement changé ma perspective spirituelle\"",
      urgencyText: "Expérience Personnalisée"
    }
  };

  const t = translations[locale];
  const link = locale === 'es'
    ? 'https://rec.lottousinews.site/es'
    : locale === 'en'
      ? 'https://rec.lottousinews.site/en'
      : locale === 'fr'
        ? 'https://rec.lottousinews.site/fr'
        : 'https://rec.lottousinews.site/br';

  const styles = {
    container: {
      width: '100%',
      maxWidth: '700px',
      margin: '2rem auto',
      padding: '0 1rem',
    },
    card: {
      position: 'relative' as const,
      background: 'linear-gradient(135deg, rgba(21, 0, 34, 0.95), rgba(74, 0, 114, 0.9))',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      boxShadow: isHovered
        ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.2)'
        : '0 15px 40px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      padding: '2rem',
    },
    backgroundGlow: {
      position: 'absolute' as const,
      top: '-50%',
      right: '-30%',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%)',
      opacity: isHovered ? 0.3 : 0.2,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'none' as const,
    },
    backgroundGlow2: {
      position: 'absolute' as const,
      top: '60%',
      left: '-20%',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(123, 31, 162, 0.2), transparent 70%)',
      opacity: isHovered ? 0.4 : 0.3,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'none' as const,
    },
    content: {
      position: 'relative' as const,
      zIndex: 2,
      textAlign: 'center' as const,
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    icon: {
      fontSize: '3rem',
      color: '#FFD700',
      filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
    },
    title: {
      fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      background: 'linear-gradient(135deg, #D4AF37, #FFD700, #FFECB3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    subtitle: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '1rem',
      fontStyle: 'italic',
    },
    description: {
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: '1.5',
      marginBottom: '1.5rem',
      maxWidth: '500px',
      margin: '0 auto 1.5rem auto',
    },
    featuresContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '0.8rem',
      marginBottom: '2rem',
    },
    feature: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '0.8rem',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: 500,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1rem',
    },
    button: {
      position: 'relative' as const,
      padding: '1.2rem 3rem',
      fontSize: '1.1rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      color: '#150022',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.8rem',
      boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
    },
    buttonGlow: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent)',
      borderRadius: '50px',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    urgencyBadge: {
      background: 'linear-gradient(135deg, rgba(123, 31, 162, 0.8), rgba(156, 39, 176, 0.9))',
      color: '#FFD700',
      padding: '0.4rem 1.2rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      boxShadow: '0 4px 15px rgba(123, 31, 162, 0.3)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
    },
    testimonial: {
      marginTop: '1.5rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      fontStyle: 'italic',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.85rem',
    },
    floatingElements: {
      position: 'absolute' as const,
      top: '20px',
      right: '20px',
      color: 'rgba(212, 175, 55, 0.6)',
      fontSize: '1.5rem',
      animation: 'float 3s ease-in-out infinite',
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background glows */}
        <div style={styles.backgroundGlow} />
        <div style={styles.backgroundGlow2} />

        {/* Floating elements */}
        <motion.div
          style={styles.floatingElements}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BsStars />
        </motion.div>

        <div style={styles.content}>
          {/* Icon */}
          <motion.div
            style={styles.iconContainer}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <GiAngelWings style={styles.icon} />
          </motion.div>

          {/* Title and subtitle */}
          <motion.h2
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.title}
          </motion.h2>

          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {t.description}
          </motion.p>

          {/* Features */}
          <motion.div
            style={styles.featuresContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                style={styles.feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Button container */}
          <motion.div
            style={styles.buttonContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Urgency badge */}
            <div style={styles.urgencyBadge}>
              {t.urgencyText}
            </div>

            {/* Main button */}
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.button}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 35px rgba(212, 175, 55, 0.6)',
                background: 'linear-gradient(135deg, #FFD700, #FFECB3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={styles.buttonGlow} />
              <BsFillPlayFill />
              {t.buttonText}
            </motion.a>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            style={styles.testimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {t.testimonialText}
          </motion.div>
        </div>
      </motion.div>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default GuardianAngelSection;