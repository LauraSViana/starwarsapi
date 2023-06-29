import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./fetchcss.css";
export default function FetchComponent() {
  const [data, setData] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUrl();
  }, []);

  const fetchUrl = function () {
    setLoading(true);

    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results);
        setPrevious(responseData.previous);
        setNext(responseData.next);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchNext = async () => {
    try {
      setLoading(true);

      const response = await fetch(next);
      const data = await response.json();

      setData(data.results);
      setPrevious(data.previous);
      setNext(data.next);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchPrevious = async () => {
    try {
      setLoading(true);

      const response = await fetch(previous);
      const data = await response.json();

      setData(data.results);
      setPrevious(data.previous);
      setNext(data.next);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openModal = (personagem) => {
    setSelectedCharacter(personagem);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div>
      {Loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="table" border={"1px"}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobre</th>
            </tr>
          </thead>
          <tbody>
            {data.map((personagem) => (
              <tr key={personagem.name}>
                <td>{personagem.name}</td>

                <td>
                  <button onClick={() => openModal(personagem)}>Sobre</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
      
          {previous && (
            <button className="butao" onClick={fetchPrevious}>
              Anterior
            </button>
          )}
          {next && (
            <button className="butao" onClick={fetchNext}>
              Próximo
            </button>
          )}
        
      </div>

      <Modal className={'modal'}
        style={{
          overlay: {
            backgroundColor: "#f0f0",
         margin:'0 auto'
      
          },
          content: {
            width: "200px",
            height: "350px",
            border: "1px solid ",
            background: "#FFF8DC",
            borderRadius: "20px",
            padding: "20px",
            position: 'absolute',
      
      
          },
        }}
        isOpen={modal}
        contentLabel="Exemplo Modal"
      >
        <button onClick={closeModal} >X</button>
        {selectedCharacter && (
          <div>
            <h2>{selectedCharacter.name}</h2>
            <p>Altura: {selectedCharacter.height}</p>
            <p>Peso: {selectedCharacter.mass}</p>
            <p>Cor do Cabelo: {selectedCharacter.hair_color}</p>
            <p>Cor da Pele: {selectedCharacter.skin_color}</p>
            <p>Cor dos Olhos: {selectedCharacter.eye_color}</p>
            <p>Ano de Nascimento: {selectedCharacter.birth_year}</p>
            <p>Gênero: {selectedCharacter.gender}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
