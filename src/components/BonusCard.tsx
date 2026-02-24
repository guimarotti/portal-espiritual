import { CSSProperties, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsChatFill, BsBookFill, BsGiftFill, BsMusicNoteBeamed, BsStarFill } from 'react-icons/bs';
import { GiMeditation } from 'react-icons/gi';

interface BonusCardProps {
  title: string;
  description?: string;
  icon: string;
  link: string;
  index: number;
  buttonText?: string;
}

const styles: Record<string, CSSProperties> = {
  card: {
    position: 'relative',
    background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.95))',
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    overflow: 'hidden',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '240px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    zIndex: 1,
    touchAction: 'manipulation',
  },
  cardInner: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    touchAction: 'manipulation',
  },
  cardBorder: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    zIndex: 0,
    borderRadius: '17px',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  iconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    position: 'relative',
    zIndex: 2,
    flexShrink: 0,
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    background: 'rgba(37, 99, 235, 0.3)',
    filter: 'blur(10px)',
    opacity: 0.5,
    zIndex: 1,
  },
  iconBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    zIndex: 2,
  },
  icon: {
    fontSize: '28px',
    color: '#fff',
    position: 'relative',
    zIndex: 3,
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  },
  title: {
    color: '#F9FAFB',
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: '0 0 8px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    lineHeight: '1.3',
    flexShrink: 0,
  },
  description: {
    color: '#D1D5DB',
    fontSize: '0.85rem',
    marginBottom: '16px',
    flexGrow: 1,
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  button: {
    marginTop: 'auto',
    padding: '10px 20px',
    borderRadius: '8px',
    background: 'linear-gradient(to right, #2563EB, #1D4ED8)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    textDecoration: 'none',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    touchAction: 'manipulation',
    flexShrink: 0,
  },
  buttonText: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  buttonIcon: {
    fontSize: '1.1rem',
    transition: 'transform 0.3s ease',
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s ease',
    zIndex: 1,
  },
  highlight: {
    position: 'absolute',
    width: '120px',
    height: '120px',
    borderRadius: '30%',
    background: 'radial-gradient(circle, var(--color-from) 0%, transparent 70%)',
    filter: 'blur(25px)',
    opacity: 0.08,
    zIndex: 0,
    transition: 'all 0.5s ease',
  },
  highlightTop: {
    top: '-20px',
    right: '-20px',
    '--color-from': '#F97316',
  } as CSSProperties,
  highlightBottom: {
    bottom: '-20px',
    left: '-20px',
    '--color-from': '#2563EB',
  } as CSSProperties,
};

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'whatsapp':
      return <BsChatFill />;
    case 'prayer':
      return <BsBookFill />;
    case 'gift':
      return <BsGiftFill />;
    case 'celestino':
      return (
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          backgroundImage: 'url(/images/IMG_8416.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '2px solid rgba(212, 175, 55, 0.8)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          zIndex: 4,
        }} />
      );
    case 'music':
      return <BsMusicNoteBeamed />;
    case 'mantra':
      return <GiMeditation />;
    case 'tarot':
      return <div style={{ fontSize: '28px' }}>🔮</div>;
    default:
      return <BsStarFill />;
  }
};

const getIconColor = (iconType: string) => {
  switch (iconType) {
    case 'whatsapp':
      return 'linear-gradient(135deg, #25D366, #128C7E)';
    case 'prayer':
      return 'linear-gradient(135deg, #F59E0B, #D97706)';
    case 'gift':
      return 'linear-gradient(135deg, #EC4899, #DB2777)';
    case 'celestino':
      return 'linear-gradient(135deg, #8B5CF6, #7C3AED)';
    case 'music':
      return 'linear-gradient(135deg, #3B82F6, #2563EB)';
    case 'tarot':
      return 'linear-gradient(135deg, #7C3AED, #5B21B6)';
    default:
      return 'linear-gradient(135deg, #2563EB, #1E40AF)';
  }
};

export default function BonusCard({ title, description, icon, link, index, buttonText = 'ACESSAR' }: BonusCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconComponent = getIcon(icon);
  const iconColor = getIconColor(icon);

  // Verificar se é um link interno ou externo
  const isInternalLink = link.startsWith('/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}
    >
      <div style={styles.card}>
        <div 
          style={{
            ...styles.cardBorder,
            opacity: isHovered ? 0.4 : 0
          }}
        />
        
        <div style={styles.cardInner}>
          <div 
            style={{
              ...styles.highlightTop,
              opacity: isHovered ? 0.15 : 0.08,
              transform: isHovered ? 'scale(1.2)' : 'scale(1)'
            }}
          />
          
          <div 
            style={{
              ...styles.highlightBottom,
              opacity: isHovered ? 0.15 : 0.08,
              transform: isHovered ? 'scale(1.2)' : 'scale(1)'
            }}
          />
          
          <motion.div
            style={{
              ...styles.iconContainer
            }}
            animate={isHovered ? {
              y: [0, -4, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <div style={styles.iconGlow} />
            <div 
              style={{
                ...styles.iconBg,
                background: iconColor
              }}
            />
            <span style={{...styles.icon, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{iconComponent}</span>
          </motion.div>
          
          <h3 style={styles.title}>
            {title}
          </h3>
          
          {description && (
            <p style={styles.description}>{description}</p>
          )}
          
          {isInternalLink ? (
            // Link interno - usa o Next Link para evitar recarregar toda a página
            <Link href={link} passHref>
              <motion.div
                style={styles.button}
                whileHover={{
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                  background: 'linear-gradient(to right, #F97316, #EA580C)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  style={{
                    ...styles.buttonShine,
                    left: isHovered ? '100%' : '-100%'
                  }}
                />
                <div style={styles.buttonText}>
                  <span>{buttonText}</span>
                  <motion.span 
                    style={styles.buttonIcon}
                    animate={isHovered ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    &rarr;
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          ) : (
            // Link externo - abre em nova aba
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.button}
              whileHover={{
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                background: 'linear-gradient(to right, #F97316, #EA580C)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                style={{
                  ...styles.buttonShine,
                  left: isHovered ? '100%' : '-100%'
                }}
              />
              <div style={styles.buttonText}>
                <span>{buttonText}</span>
                <motion.span 
                  style={styles.buttonIcon}
                  animate={isHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  &rarr;
                </motion.span>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}