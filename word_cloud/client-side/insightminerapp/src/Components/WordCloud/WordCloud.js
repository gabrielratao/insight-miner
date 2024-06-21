import './WordCloud.css';
import React, { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Engload from '../Loading/Loading'

//Customiza a aparencia da nuvem
const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        animation: 'blinker 8s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size / 12}em`,
        //border: `2px solid ${color}`,
        margin: '2px',
        padding: '2px',
        display: 'inline-block',
        color: `${color}`,
      }}
    >
      {tag.value}
    </span>
)

//Cria a nuvem de palavras
const WordCloud = () => {
    const [chave, setChave] = useState('');
    const [valores, setValores] = useState([]);
    const [Loading, setLoading] = useState(false);
    const MaxWords = 60;
 
    //Estado para guardar o valor do input
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
                //console.log("dados recebidos:", data)
                if (data) {
        
                    //Formata os dados recebidos em um array
                    const wordsArray = data.split(' ');
                    //Limita o numero de palavras na nuvem
                    const limitedWordsinCloud =  wordsArray.slice(10, MaxWords);
                    //Mapeia as palavras para popular a nuvem
                    const formattedValues = limitedWordsinCloud.map((word, index) => ({ key: `${valores}-${index}`,value: word, count: Math.floor(Math.random() * 50) + 1}));
                    setValores(formattedValues); // Define os valores recebidos da API
                } else {
                    setValores([]); // Limpa os valores exibidos
                    alert('Nenhum resultado encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                alert('Ocorreu um erro ao buscar os dados.', error);
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
                            minSize={12}
                            maxSize={28}
                            tags={valores}
                            renderer={customRenderer}
                        />
                    )}
            </div>
        </div>
    )
};


export default WordCloud;