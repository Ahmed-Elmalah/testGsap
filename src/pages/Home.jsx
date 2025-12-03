import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import SkillsSection from "../components/SkillsSection";
import ProjectGallery from "../components/ProjectGallery";
import SpaceSkills from "../components/SpaceSkills";
import Experience from '../components/Experience';
import TerminalContact from '../components/TerminalContact';
import RocketDream from '../components/RocketDream';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <Marquee />
      <SkillsSection />
      <SpaceSkills />
      <RocketDream />
      <ProjectGallery />
      <Experience />
      <div className="relative z-20">
        <TerminalContact />
      </div>
    </div>
  );
};

export default Home;
