import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import { supabase } from '../lib/supabase';
import LetterForm from "../components/LetterForm";
import LetterModal from "../components/LetterModal";
import LetterCard from "../components/LetterCard";
import { chiikawaHeart } from "../asset/importImg";
import { useNavigate } from "react-router-dom";


export default function Admin() {
    const [open, setOpen] = useState(false);
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState("");
    const [editLetter, setEditLetter] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const fetchedData = await fetchLetters();
            console.log(fetchedData);
            if (fetchedData) setLetters(fetchedData);
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
    async function uploadLetter({ title, content, published }) {
        const { data, error } = await supabase
            .from('letters')
            .insert([
                {
                    title,
                    content,
                    published,
                }
            ])
            .select()
            .single();

        if (error) {
            console.error("Error uploading letter:", error);
            throw error;
        }

        console.log("Letter uploaded successfully:", data);
        return data;
    }

    async function updateLetter(id,{title, content, published}) {
      const {data, error} = await supabase
        .from("letters")
        .update({title, content, published})
        .eq("id", id)
        .select()
        .single();

        if (error) setSubmitError(error);
        return data;
    }

    async function deleteLetter(id) {
      const { error } = await supabase
      .from("letters")
      .delete()
      .eq("id", id)
      
      if(error) console.error("Error deleteing letter:", error.message);
      
      setLetters(prevLetter => prevLetter.filter(item => item.id !== id));
      console.log('Letter deleted successfully.')
    }

    function handleOpenModal(letter=null) {
      setSubmitError("");
      setEditLetter(letter);
      setOpen(true);
    }

    function closeModal() {
      setOpen(false);
      setEditLetter(null);
      setSubmitError("");
    }


  return (
    <Layout>
      <div className="admin-container">
        <img src={chiikawaHeart} alt="decorative" className="chiikawa-heart-left" />
        <img src={chiikawaHeart} alt="decorative" className="chiikawa-heart-right" />
        <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
        <div className="banner">
          <h1>Write A Letter</h1>
        </div>

        {loading && <p style={{ opacity: 0.7, textAlign: "center" }}>Loading…</p>}

        <div className="letter-container">
          {letters.length === 0 ? (
            <p style={{ opacity: 0.7, textAlign: "center" }}>No letters yet.</p>
          ) : (
            <ul className="letter-grid">
              {letters.map((l) => (
                <li key={l.id} className="letter-list-item">
                  <div onClick={() => handleOpenModal(l)}>
                    <LetterCard 
                      letter={l}
                      onDelete={deleteLetter}
                      isDelete={true}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="btn-group">
          <button
            onClick={() => {
              handleOpenModal();
            }}
          >
            New Letter
          </button>
          <button
            onClick={async () => {
              const data = await fetchLetters();
              if (data) setLetters(data);
            }}
          >
            Refresh
          </button>
        </div>
        {open && (
          <LetterModal
            onClose={() => {
              closeModal();
            }}
          >
            <LetterForm
              open={open}
              onClose={() => {
                closeModal();
              }}
              errorMessage={submitError}
              initialData={editLetter}
              onSubmit={async ({id,  title, content, published }) => {
                try {
                  setSubmitError("");
                  const saved = id 
                    ? await updateLetter (id, {title, content, published})
                    : await uploadLetter ({title, content, published});
                 
                  setLetters((prev) => 
                    id
                    ? prev.map((x) => (x?.id === saved.id ? saved : x))
                    : [saved, ...prev]
                  );
                  closeModal();
                } catch (error) {
                  setSubmitError(error?.message ?? "Failed to save letter.");
                }
          }}
        />
          </LetterModal>
        )}
        
      </div>
    </Layout>
  );
}

 
