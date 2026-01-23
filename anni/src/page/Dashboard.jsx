import React, {useState, useEffect} from "react";
import '../App.css';
import Layout from "../components/Layout";
import { chiikawaHeart } from "../asset/importImg";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import LetterCard from "../components/LetterCard";
import LetterModal from "../components/LetterModal";
import Letter from "../components/Letter";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLetter, setActiveLetter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
          (async () => {
              const data = await fetchLetters();
              console.log(data);
              if (data) setLetters(data);
              setLoading(false);
          })();
      }, []);
  
      async function fetchLetters() {
          const {data, error} = await supabase
          .from('letters')
          .select('*')
          .order('created_at', { ascending: false });
          setLoading(false);
          if (error) {
              console.error("Error fetching letters:", error);
          } else {
              console.log("Letters fetched successfully:", data);
          }
          return(data ?? []).filter(Boolean);
      }

  return (
    <Layout>
      <div className="dashboard-container">
         <img src={chiikawaHeart} alt="decorative" className="chiikawa-heart-left" />
          <img src={chiikawaHeart} alt="decorative" className="chiikawa-heart-right" />
          <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>

        <div className="banner"> 
          <h1>Dear Trevor</h1>
        </div>
        {loading && <p style={{ opacity: 0.7, textAlign: "center" }}>Loading…</p>}
        <div className="letter-container">
          {letters.length === 0 ? (
            <p style={{ opacity: 0.7, textAlign: "center" }}>No letters yet.</p>
          ) : (
            <ul className="letter-grid">
              {letters.map((l) => (
                <li key={l.id} className="letter-list-item">
                  {l.published && 
                  <div onClick={() =>{ 
                    setOpen(true);
                    setActiveLetter(l);
                    }}>
                    <LetterCard 
                      letter={l}
                      onDelete={null}
                      isDelete={false}
                    />
                  </div>
                  }
                </li>
              ))}
            </ul>
          )}
        </div>
        {open && 
        <LetterModal onClose={() => {
          setOpen(false);
          setActiveLetter(null);
        }}>
          <Letter letter={activeLetter}/>
        </LetterModal>}
      </div>
    </Layout>
  );
}

 