import LandingDescription from '../components/specific/LandingDescription';
import MainPopularPlatform from '../components/specific/MainPopularPlatform';
import Footer from './../components/layout/Footer';

const HomePage = () => {
  return (
    <div className='w-full'>
      <MainPopularPlatform />
      <LandingDescription />
      <Footer />
    </div>
  );
};
export default HomePage;
