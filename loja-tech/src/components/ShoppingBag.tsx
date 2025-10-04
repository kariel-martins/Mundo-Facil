import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface IconLoaderProps {
  size?: number;
}

export function IconLoader({ size = 64 }: IconLoaderProps) {
  return (
    // Fundo branco ou cinza muito claro
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      {/* Container Principal */}
      <motion.div
        className="relative flex flex-col items-center justify-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ícone Simples e Clean (Cinza Chumbo ou Azul Claro) */}
        <motion.div
          className="text-blue-400"
          animate={{ scale: [1, 1.1, 1] }} // Pulso suave
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ShoppingBag
            className={`w-[${size}px] h-[${size}px]`}
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Texto do Loader - Focado no Mundo Fácil */}
        <motion.p
          aria-live="polite"
          className="text-xl font-semibold tracking-wide text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "linear",
          }}
        >
          Carregando Mundo Fácil...
        </motion.p>

        {/* Efeito de Sombra/Luz Sutil (Removido o blur agressivo) */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-blue-400/20 blur-xl -z-10"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}