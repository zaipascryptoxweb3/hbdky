"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Crown, 
  Gift, 
  Heart, 
  Mail, 
  Music4, 
  Sparkles, 
  Stars,
  Star,
  Lock,
  Unlock
} from "lucide-react";

// --- TypeScript Definitions ---
interface ConfettiPiece {
  id: number;
  left: string;
  delay: number;
  duration: number;
  x: number;
  color: string;
}

// --- Configuration ---
const config = { 
  recipientName: "Kylie", 
  senderName: "Zaipas", 
  headline: "Happy Birthday", 
  eyebrow: "crafted with love, just for you", 
  introLine: "Tonight is not just a birthday greeting. It is a small world made only to celebrate you.", 
  subheadline: "A premium little birthday experience filled with warmth, wonder, and a touch of magic.", 
  dateLabel: "Your Day, Your Light", 
  accentWord: "unforgettable", 
  songTitle: "Paraluman", 
  songArtist: "Adie", 
  songEmbedUrl: "https://www.youtube.com/embed/yBtO2CdZYss?rel=0", 
  finalMessage: "May this year wrap you in happiness, protect your peace, reward your kind heart, and return every beautiful thing you deserve.", 
  signatureNote: "Some people receive birthday messages. You deserve something far more special.", 
  highlights: [ 
    "your smile feels like comfort", 
    "your presence makes moments softer", 
    "your energy is rare and beautiful", 
  ], 
  gallery: [ 
    { 
      title: "Candid Beauty", 
      caption: "Just a quiet moment, but it's one of my favorites because it's just you being effortlessly you.", 
      image: "/image/kylie.jpg", 
    }, 
    { 
      title: "Effortlessly Cute", 
      caption: "Even when you are actively trying to look ridiculous, you still look absolutely beautiful.", 
      video: "/media/1.mp4", 
    }, 
    { 
      title: "Softest Smile", 
      caption: "From the softest moments to the absolute goofiest ones", 
      video: "/media/2.mp4", 
    },
    { 
      title: "Happy", 
      caption: "", 
      image: "/image/idate1.jpg", 
    },
    { 
      title: "Birthday", 
      caption: "", 
      image: "/image/ky2.jpg", 
    },  
    { 
      title: "Kylie", 
      caption: "", 
      image: "/image/ky3.jpg", 
    },    
  ], 
  letter: [ 
    "Dear Kylie,", 
    "Happy birthday to someone truly special. There is a certain kind of beauty that goes beyond appearance — the kind that lives in a person's presence, warmth, and the way they make the world feel lighter. That is what you carry.", 
    ""Happy birthday to someone who truly deserves the best. To be completely honest with you, this is my very first time building and deploying a website just to send a birthday greeting. But when I thought about how to celebrate you today, an ordinary message simply didn't feel like enough. You inspire me to put in that extra effort.", 
    "I know we are both in a season of life where we are incredibly busy, working hard, and focusing deeply on our career paths. It is amazing to see you chasing your goals, even though it means we don't always get to talk or spend time together as much as I would like.", 
    "Despite how chaotic our schedules can get, you are always on my mind. I am constantly hoping that the timing will align for us, and that we will get the chance to finally meet up and catch up soon, whenever it is possible for both of us.", 
    "Until that day comes, I hope you feel incredibly celebrated today. I hope this year brings you so much success, protects your peace, and gives you moments that feel like answered prayers. Happy birthday, Kylie."
  ], 
};

const steps = ["intro", "spotlight", "gallery", "letter", "finale"] as const;

// --- Custom UI Components ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary", className = "", disabled = false, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium active:scale-95";
  const variants = {
    primary: "bg-slate-800 text-white hover:bg-slate-700 hover:shadow-xl hover:shadow-slate-800/20",
    outline: "border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
  };
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// --- Main Application ---
export default function BirthdayGreetingLuxury() { 
  // AUTHENTICATION STATE
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authMonth, setAuthMonth] = useState("");
  const [authDay, setAuthDay] = useState("");
  const [authYear, setAuthYear] = useState("");
  const [authError, setAuthError] = useState(false);

  // APP STATE
  const [step, setStep] = useState(0); 
  const [openIntro, setOpenIntro] = useState(false); 
  const [celebrateKey, setCelebrateKey] = useState(0); 
  const [typedText, setTypedText] = useState("");
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  const currentStep = steps[step]; 
  const isFirst = step === 0; 
  const isLast = step === steps.length - 1;

  const floatingElements = useMemo(() => Array.from({ length: 22 }, (_, i) => ({ 
    id: i, 
    left: `${2 + i * 4.4}%`, 
    top: `${(i * 9) % 100}%`, 
    duration: 7 + (i % 5), 
    delay: i * 0.18, 
    size: 10 + (i % 4) * 6, 
    type: i % 3, 
  })), []);

  // --- Handlers ---
  const handleUnlock = () => {
    // Check for March (3), 23, 2001
    if (authMonth === "3" && authDay === "23" && authYear === "2001") {
      setIsUnlocked(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 500); // Reset after shake animation
    }
  };

  useEffect(() => {
    const pieces = Array.from({ length: 60 }, (_, i) => ({ 
      id: i, 
      left: `${Math.random() * 100}%`, 
      delay: Math.random() * 0.8, 
      duration: 2.5 + Math.random() * 2.5, 
      x: (Math.random() - 0.5) * 200, 
      color: ['#F472B6', '#38BDF8', '#818CF8', '#FDE047'][i % 4]
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfettiPieces(pieces);
  }, [celebrateKey]);

  useEffect(() => { 
    if (currentStep !== "intro" || !openIntro) return;
    const target = `${config.headline}, ${config.recipientName}.`;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypedText("");
    
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setTypedText(target.slice(0, index));
      if (index >= target.length) clearInterval(interval);
    }, 75);

    return () => clearInterval(interval);
  }, [currentStep, openIntro]);

  const next = () => {
    if (currentStep === "intro" && !openIntro) {
      setOpenIntro(true);
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  
  const prev = () => setStep((prev) => Math.max(prev - 1, 0)); 
  const celebrate = () => setCelebrateKey((prev) => prev + 1);

  const renderFloating = (type: number, className: string) => { 
    if (type === 0) return <Sparkles className={className} />; 
    if (type === 1) return <Heart className={className} />; 
    return <Star className={className} />; 
  };

  const renderGalleryCard = (item: { title: string; caption: string; image?: string; video?: string }, index: number) => { 
    const tilt = [-3, 2, -1][index % 3];

    return (
      <motion.div
        key={item.title + index}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="w-full"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="rounded-4xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
          <div className="overflow-hidden rounded-[1.4rem] border border-slate-100 bg-slate-50 relative group">
            {item.video ? (
              <video 
                src={item.video} 
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                autoPlay 
                muted 
                loop 
                playsInline
              />
            ) : item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.title} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="flex h-64 items-center justify-center bg-linear-to-br from-pink-50 to-sky-50">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                    <Heart className="h-7 w-7 text-pink-400" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-500">Add a meaningful photo</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="px-3 pb-4 pt-6 text-center">
            <p className="text-xl font-bold text-slate-800">{item.title}</p>
            {item.caption && <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.caption}</p>}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderStep = () => { 
    switch (currentStep) { 
      case "intro": 
        return ( 
          <div className="flex flex-col items-center justify-center text-center py-10 md:py-16"> 
            <motion.div 
              initial={{ opacity: 0, y: 16 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 backdrop-blur shadow-sm" 
            > 
              <Crown className="h-4 w-4 text-amber-500" /> 
              {config.eyebrow} 
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.7 }}
              className="mt-8 inline-flex rounded-full bg-linear-to-r from-sky-50 to-pink-50 px-6 py-3 text-sm font-bold tracking-widest text-sky-600 shadow-sm border border-white"
            >
              {config.dateLabel}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
            >
              {config.introLine}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8 }}
              className="mt-12 w-full max-w-4xl rounded-[3rem] border border-white bg-white/60 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl md:p-12"
            >
              {!openIntro ? (
                <div className="py-12 md:py-16">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-pink-100 to-sky-100 shadow-xl shadow-pink-100/50">
                    <Gift className="h-12 w-12 text-pink-500" />
                  </div>
                  <h1 className="mt-10 text-4xl font-black tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
                    A Birthday Surprise<br/>for {config.recipientName}
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
                    {config.subheadline}
                  </p>
                  <div className="mt-10">
                    <Button className="rounded-full px-10 py-5 text-lg" onClick={() => setOpenIntro(true)}>
                      Open Your Greeting ✨
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-10 md:py-16">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold uppercase tracking-[0.4em] text-sky-500"
                  >
                    for the one being celebrated today
                  </motion.p>
                  <div className="mx-auto mt-8 min-h-30 max-w-3xl text-center text-5xl font-black leading-tight tracking-tight text-slate-800 md:min-h-37.5 md:text-7xl lg:text-8xl">
                    {typedText}
                    <span className="ml-2 inline-block h-10 w-1 animate-pulse rounded-full bg-sky-400 align-middle md:h-16" />
                  </div>
                  <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 italic">
                    {"\""}{config.signatureNote}{"\""}
                  </p>
                  <div className="mt-12 flex justify-center">
                    <Button className="rounded-full px-10 py-5 text-lg" onClick={next}>
                      Continue <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        );

      case "spotlight":
        return (
          <div className="py-8">
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-amber-500" />
                little things that make you unforgettable
              </div>
              <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-800 md:text-6xl">
                The {config.recipientName} Spotlight
              </h2>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
              {config.highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-transform hover:-translate-y-2"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-pink-50 to-sky-50 shadow-inner group-hover:scale-110 transition-transform">
                    <Heart className="h-8 w-8 text-pink-400" />
                  </div>
                  <p className="mt-8 text-xl font-bold leading-relaxed text-slate-800">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
              <Card className="rounded-[3rem] border border-white bg-white/80 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
                <CardContent className="p-10 md:p-12">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">
                    birthday dedication
                  </p>
                  <h3 className="mt-6 text-4xl font-black text-slate-800">
                    Happy birthday.
                  </h3>
                  <p className="mt-6 text-lg leading-relaxed text-slate-600">
                    Some people are easy to greet. But some people make you want to do more,
                    say more, and create something that feels worthy of them. That is the kind of
                    presence you have.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-[3rem] border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl shadow-indigo-900/20">
                <CardContent className="flex h-full flex-col justify-center p-10 md:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-300">
                    from {config.senderName}
                  </p>
                  <p className="mt-8 text-3xl font-bold leading-tight text-white/95 italic">
                    {"\""}I wanted this greeting to feel like a moment, not just a message.{"\""}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="py-8">
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur">
                <Heart className="h-4 w-4 text-pink-500" />
                memory collection
              </div>
              <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-800 md:text-6xl">
                Beautiful Moments
              </h2>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
              {config.gallery.map((item, index) => renderGalleryCard(item, index))}
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
              <Card className="rounded-[3rem] border border-white bg-white/80 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
                <CardContent className="p-10 md:p-12">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                      <Music4 className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">
                      soundtrack
                    </p>
                  </div>
                  <h3 className="mt-8 text-4xl font-black text-slate-800">{config.songTitle}</h3>
                  <p className="mt-3 text-xl font-medium text-slate-500">{config.songArtist}</p>
                  <p className="mt-8 text-lg leading-relaxed text-slate-600">
                    Music has a way of holding memories better than photographs sometimes. 
                    This song will always remind me of the warmth and joy you bring.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-[3rem] border border-white bg-white/80 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
                <CardContent className="p-5">
                  {config.songEmbedUrl ? (
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-100">
                      <iframe
                        className="aspect-video w-full"
                        src={config.songEmbedUrl}
                        title="Birthday Song"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center rounded-[2.5rem] bg-linear-to-br from-indigo-50 via-sky-50 to-pink-50">
                      <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-indigo-100/50">
                          <Music4 className="h-10 w-10 text-indigo-400" />
                        </div>
                        <p className="mt-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Add YouTube Embed</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "letter":
        return (
          <div className="py-8">
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur">
                <Mail className="h-4 w-4 text-sky-500" />
                personal letter
              </div>
              <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-800 md:text-6xl">
                Words Meant Only For You
              </h2>
            </div>

            <Card className="mx-auto mt-16 max-w-4xl rounded-[3rem] border border-white bg-white/90 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl">
              <CardContent className="p-6 md:p-12">
                <div className="rounded-[2.5rem] bg-linear-to-br from-slate-50 via-white to-pink-50/30 p-8 md:p-14 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Stars className="w-40 h-40" />
                  </div>
                  <div className="space-y-8 text-lg leading-loose text-slate-700 relative z-10">
                    {config.letter.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.8 }}
                        className={index === 0 ? "text-2xl font-bold text-slate-800" : ""}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                      className="pt-10 text-right"
                    >
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Yours truly,</p>
                      <p className="text-3xl font-black text-slate-800">— {config.senderName}</p>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "finale":
        return (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, duration: 1 }}
              className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-pink-400 via-rose-400 to-indigo-400 shadow-2xl shadow-pink-300/50"
            >
              <Sparkles className="h-14 w-14 text-white" />
            </motion.div>

            <h2 className="mt-12 text-5xl font-black tracking-tight text-slate-800 md:text-7xl lg:text-8xl">
              Happy Birthday,<br/>{config.recipientName} ✨
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-slate-600">
              {config.finalMessage}
            </p>

            <div className="mt-16 rounded-[2.5rem] border border-white bg-white/80 px-12 py-8 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-sky-500">
                with admiration,
              </p>
              <p className="mt-4 text-4xl font-black text-slate-800">{config.senderName}</p>
            </div>

            <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row">
              <Button className="rounded-full px-12 py-6 text-xl shadow-xl shadow-slate-800/20" onClick={celebrate}>
                Make It Sparkle 🎉
              </Button>
              <Button variant="outline" className="rounded-full px-12 py-6 text-xl" onClick={() => { setStep(0); setOpenIntro(false); setIsUnlocked(false) }}>
                Replay Greeting
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return ( 
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fdfdfd] selection:bg-pink-100 selection:text-pink-900"> 
      
      {/* Background Gradients & Floating Elements */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ backgroundImage: "radial-gradient(circle at top right, #f0f9ff 0%, transparent 40%), radial-gradient(circle at bottom left, #fff1f2 0%, transparent 40%)" }}
      > 
        <div className="absolute left-[-10%] top-[-10%] h-160 w-160 rounded-full bg-pink-100/40 blur-[100px]" /> 
        <div className="absolute right-[-10%] top-[20%] h-160 w-160 rounded-full bg-sky-100/40 blur-[100px]" /> 
        <div className="absolute bottom-[-10%] left-[20%] h-160 w-160 rounded-full bg-violet-100/30 blur-[100px]" />

        {floatingElements.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{ left: item.left, top: item.top }}
            animate={{
              y: [0, -20, 0],
              x: [0, item.id % 2 === 0 ? 15 : -15, 0],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {renderFloating(item.type, `h-${Math.floor(item.size/4)} w-${Math.floor(item.size/4)} text-slate-300/50`)}
          </motion.div>
        ))}
      </div>

      {/* Confetti Overlay */}
      <AnimatePresence>
        {celebrateKey > 0 && (
          <div key={celebrateKey} className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {confettiPieces.map((bit) => (
              <motion.div
                key={bit.id}
                className="absolute top-[-5%] h-4 w-3 rounded-sm"
                style={{ left: bit.left, backgroundColor: bit.color }}
                initial={{ y: -20, opacity: 0, scale: 0 }}
                animate={{ 
                  y: "110vh", 
                  opacity: [0, 1, 1, 0], 
                  rotate: [0, 360, 720], 
                  rotateX: [0, 360],
                  scale: [0, 1, 1, 0.5],
                  x: [0, bit.x, bit.x * 1.5]
                }}
                transition={{ duration: bit.duration, delay: bit.delay, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Conditional Rendering: Lock Screen vs Main App */}
      {!isUnlocked ? (
        <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <motion.div
            animate={authError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <Card className="rounded-[3rem] border border-white bg-white/80 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl md:p-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-pink-100 to-sky-100 shadow-inner">
                  {authError ? <Lock className="h-8 w-8 text-rose-500" /> : <Unlock className="h-8 w-8 text-pink-500" />}
                </div>
                
                <h2 className="text-3xl font-black tracking-tight text-slate-800">
                  Hello, {config.recipientName}
                </h2>
                <p className="mt-3 text-slate-500">
                  Please enter your birthday to unlock your surprise.
                </p>

                {/* Date Selection Dropdowns */}
                <div className="mt-8 flex w-full gap-3">
                  <select 
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100/50"
                    value={authMonth} 
                    onChange={e => setAuthMonth(e.target.value)}
                  >
                    <option value="" disabled>Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>

                  <select 
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100/50"
                    value={authDay} 
                    onChange={e => setAuthDay(e.target.value)}
                  >
                    <option value="" disabled>Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}`}>{i + 1}</option>
                    ))}
                  </select>

                  <select 
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100/50"
                    value={authYear} 
                    onChange={e => setAuthYear(e.target.value)}
                  >
                    <option value="" disabled>Year</option>
                    {/* Generates years from 1990 to 2010 */}
                    {Array.from({ length: 21 }, (_, i) => (
                      <option key={1990 + i} value={`${1990 + i}`}>{1990 + i}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 min-h-6">
                  {authError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-sm font-bold text-rose-500"
                    >
                    </motion.p>
                  )}
                </div>

                <Button className="mt-6 w-full rounded-full py-4 text-lg" onClick={handleUnlock}>
                  Unlock Experience
                </Button>
              </div>
            </Card>
          </motion.div>
        </main>

      ) : (

        <main className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-8">
          
          {/* Navigation & Progress Tracker */}
          <AnimatePresence>
            {step > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100">
                    <Heart className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      A Celebration For
                    </p>
                    <h1 className="text-xl font-black text-slate-800">
                      {config.recipientName}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/80 p-2 shadow-sm border border-white backdrop-blur">
                  {steps.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => { if(openIntro) setStep(index) }}
                      className={`h-3 rounded-full transition-all duration-500 ${
                        index === step ? "w-12 bg-slate-800" : "w-3 bg-slate-200 hover:bg-slate-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide Render Container */}
          <div className="min-h-[70vh] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Controls */}
          <AnimatePresence>
            {step > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-16 flex flex-col gap-6 border-t border-slate-200/60 pt-8 sm:flex-row sm:items-center sm:justify-between px-2"
              >
                <p className="max-w-md text-sm leading-relaxed text-slate-400 font-medium">
                  Created with careful intention. Every detail, animation, and word is dedicated to celebrating {config.recipientName}.
                </p>

                <div className="flex items-center gap-4">
                  <Button variant="outline" className="rounded-full px-8 py-4" onClick={prev} disabled={isFirst}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button className="rounded-full px-10 py-4 shadow-xl shadow-slate-800/10" onClick={isLast ? celebrate : next}>
                    {isLast ? "Celebrate!" : "Next Chapter"}
                    {!isLast && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}

    </div>
  );
}