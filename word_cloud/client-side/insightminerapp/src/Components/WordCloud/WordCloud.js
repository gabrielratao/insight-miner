import './WordCloud.css';
import React, { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Engload from '../Loading/Loading'

//Cria a nuvem de palavras
const WordCloud = () => {
    const [chave, setChave] = useState('');
    const [valores, setValores] = useState([]);
    const [Loading, setLoading] = useState(false);
    const MaxWords = 60;
 

    const handleInputChange = (event) => {
        setChave(event.target.value);
    };

    //Gatilho para pesquisar palavra chave
    const handleSearchButtonClick = () => {
        setLoading(true);
        fetch(`http://localhost:5000/api/words/cloud/?search_word=${encodeURIComponent(chave)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível carregar os dados.');
                }
                return response.text();
            })
            .then(data => {
                console.log("dados recebidos:", data)
                if (data) {
        
                    //Formata a string em um array
                    const wordsArray = data.split(' ');
                    //Limita o numero de palavras na nuvem
                    const limitedWordsinCloud =  wordsArray.slice(0, MaxWords);
                    //Mapeia as palavras 
                    const formattedValues = limitedWordsinCloud.map((word, index) => ({ key: `${valores}-${index}`,value: word, count: 1}));
                    setValores(formattedValues); // Define os valores recebidos da API
                } else {
                    setValores([]); // Limpa os valores exibidos
                    alert('Nenhum resultado encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                alert('Ocorreu um erro ao buscar os dados.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='wordcloud-section'>
            <h2>Digite uma palavra chave</h2>
            <div className='searchbox'>
        
                <input className='search-input'
                placeholder='ex javascript' 
                value={chave}
                onChange={handleInputChange} 
                type='text'
                />

                <button 
                className='btn-search'
                onClick={handleSearchButtonClick}>
                    Pesquisar
                </button>
            </div>
         
            <div className='wordcloud-box'>
                {Loading ? (
                        <Engload /> // Mostra o componente de loading enquanto os dados são carregados
                    ) : (
                        <TagCloud 
                            minSize={6}
                            maxSize={35}
                            tags={valores}
                            styleOption={customCloud}
                        />
                    )}
            </div>
        </div>
    )
};


export default WordCloud;