// App.js
import React, { useState } from "react";
import { FaHome, FaSearch, FaPlusSquare, FaUser, FaShareAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [posts, setPosts] = useState([]);

  // Generar ID único para cada publicación
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Subir archivo
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const id = generateId();
    const url = URL.createObjectURL(file);
    const newPost = {
      id,
      file,
      url,
      shareLink: `${window.location.origin}/post/${id}`,
    };
    setPosts([newPost, ...posts]);
  };

  // Copiar link
  const handleShare = (link) => {
    navigator.clipboard.writeText(link);
    alert("✅ Link copiado para compartir: " + link);
  };

  return (
    <div className="app">
      {/* Contenido */}
      <div className="content">
        {activeTab === "home" && <h2>🏠 Inicio</h2>}
        {activeTab === "search" && <h2>🔎 Buscar</h2>}
        {activeTab === "profile" && (
          <div>
            <h2>👤 Mi Perfil</h2>
            {posts.length === 0 ? (
              <p>No has subido nada todavía.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post">
                  {post.file.type.startsWith("image") ? (
                    <img src={post.url} alt="subido" width="200" />
                  ) : (
                    <video src={post.url} width="200" controls />
                  )}
                  <button onClick={() => handleShare(post.shareLink)} className="share-btn">
                    <FaShareAlt /> Compartir
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Barra de navegación */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab("home")}>
          <FaHome size={24} />
        </button>
        <button onClick={() => setActiveTab("search")}>
          <FaSearch size={24} />
        </button>

        {/* Botón "+" con input */}
        <label className="upload-btn">
          <FaPlusSquare size={28} />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>

        <button onClick={() => setActiveTab("profile")}>
          <FaUser size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
