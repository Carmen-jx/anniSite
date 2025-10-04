import React from 'react'
import { FloatingImgAssets } from '../asset/importImg';
import { useNavigate } from "react-router-dom";
import FloatingImg from '../components/FloatingImg';
import PinPad from '../components/Pinpad';
import Layout from '../components/Layout';



export default function Login() {
  let navigate = useNavigate();
  let passcode = '0830';
  let adminPasscode = '0602';
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
        <div className = "login-floating-img-container">
          <div className='login-container'>
            <h1> Enter Passcode </h1>
            <PinPad
              length={4}
              correctPin={passcode}
              adminPin={adminPasscode}
              onSuccess={(pin) => {
                if (pin === passcode) {
                  navigate("/dashboard");
                } else if (pin === adminPasscode) {
                  navigate("/admin");
                }
              }}
              onFail={() => alert("Incorrect passcode")}
            />
          </div>
        </div>

        <div id="modal" class="modal">
          <div class="modal-body">
            <p id="result"></p>
          </div>
        </div>
    </Layout>
     
  )
}
