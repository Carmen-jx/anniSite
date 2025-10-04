import FloatingImg from '../components/FloatingImg';
import { BgFrame } from '../asset/importImg';
import { FloatingImgAssets } from '../asset/importImg';
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';

function Home() {

  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  return (
    <Layout>
      <FloatingImg 
        images={FloatingImgAssets}
        movement='wander'
        density={2.7}
        minSize={64}
        maxSize={120}
        minSpeed={12}
        maxSpeed={24}
        className="my-floating-img"
      />
        <div className = "floating-img-container">
          <img src={BgFrame} className="bg-frame" alt="bg frame" />    
          <div className='banner'>
            <h1>❤️ Happy Anniversary ❤️</h1>
            <div className='framed-msg'>
              <p>To my one and only sus boy</p>
              <p>It seems that another year has passed</p>
              <p>💕 Please log in to read the💕 letters from your sus girl</p>
            </div>
          </div>
          <FloatingImg 
            images={FloatingImgAssets}
            movement='wander'
            density={2.5}
            minSize={64}
            maxSize={120}
            minSpeed={12}
            maxSpeed={24}
            className="my-floating-img"
          />
            <button className='login-button' onClick={handleLogin}>Log in</button>
        </div>
    </Layout>
    
  );
}

export default Home;
