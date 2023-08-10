import "./AboutUs.css";
import { motion } from "framer-motion";
import NavBar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer'

const cardVariants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.5
    }
  }
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function CardAboutUs({ emoji, hueA, hueB, text, secondLine }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      animate="onscreen" 
      variants={cardVariants} 
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }} 
      viewport={{ once: true, offset: 0.8 }} 
    >
      <div className="splash" style={{ background }} />
      <motion.div className="card">
        <div className="emoji">{emoji}</div>
        <div className="card-text">{text}</div>
        <div className="second-line">{secondLine}</div>
      </motion.div>
    </motion.div>
  );
}

const food = [
  { emoji: "🇧🇷", hueA: 150, hueB: 180, text: "Matheus Alves", secondLine: "Full Stack Developer" },
  { emoji: "🇵🇪", hueA: 20, hueB: 10, text: "Waldir Merjildo", secondLine: "Full Stack Developer" },
  { emoji: "🇦🇷", hueA: 170, hueB: 200, text: "Gaston Vilte", secondLine: "Full Stack Developer" },
];

export default function AboutUs() {
  return (
    <div>
      <NavBar />
      <div className="full-screen-background">
      <div className="multi-card-container"> 
        {food.map(({ emoji, hueA, hueB, text, secondLine }) => (
          <CardAboutUs emoji={emoji} hueA={hueA} hueB={hueB} text={text} secondLine={secondLine} key={emoji} />
        ))}
      </div>
     
      <Footer />
      </div>
    </div>
  );
}