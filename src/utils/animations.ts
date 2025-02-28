
export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren || 0.1,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

export const fadeInUp = (delay?: number) => {
  return {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: delay || 0,
        ease: "easeOut",
      },
    },
  };
};

export const fadeIn = (direction?: string, type?: string, delay?: number, duration?: number) => {
  return {
    hidden: {
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type || "tween",
        delay: delay || 0,
        duration: duration || 0.5,
        ease: "easeOut",
      },
    },
  };
};

// Add the missing slideUp animation
export const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.8
    }
  }
};
