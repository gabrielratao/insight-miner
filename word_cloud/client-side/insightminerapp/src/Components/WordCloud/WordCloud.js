import './WordCloud.css';
import React, { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Engload from '../Loading/Loading'

const WordCloud = () => {
    const [chave, setChave] = useState('');
    const [valores, setValores] = useState([]);

    const data = {
        'coca': ['refrigerante', 'mal a saúde', 'açucar', 'gás', 'bebida', 'cola', 'energético', 'doce', 'desidratação', 'sede'],
        'cesusc': ['faculdade', 'ads', 'back-end', 'ibsem', 'graduação', 'curso', 'tecnologia', 'ensino', 'aprendizado', 'conhecimento'],
        'ads': ['tecnologia', 'sistemas', 'curso', 'programação', 'desenvolvimento', 'web', 'mobile', 'frontend', 'backend', 'software'],
        'react': ['biblioteca', 'componentes', 'estado', 'props', 'componentização', 'interface', 'renderização', 'ciclo de vida', 'hooks', 'fluxo de dados'],
        'javascript': ['linguagem', 'frontend', 'backend', 'web', 'programação', 'html', 'css', 'nodejs', 'ecmascript', 'framework'],
        'desenvolvimento': ['software', 'aplicativos', 'web', 'mobile', 'código', 'engenharia', 'projeto', 'equipe', 'metodologias', 'agile'],
        'esporte': ['futebol', 'basquete', 'vôlei', 'natação', 'atletismo', 'ginástica', 'tênis', 'handebol', 'boxe', 'ciclismo', 'judô', 'surf', 'skate', 'corrida', 'musculação', 'pilates', 'yoga', 'pilates', 'capoeira', 'karatê'],
        'comida': ['pizza', 'hamburguer', 'sushi', 'churrasco', 'massas', 'saladas', 'sobremesas', 'vegetariana', 'vegana', 'fast-food', 'gourmet', 'saudável', 'restaurantes', 'chef', 'cozinha', 'receitas', 'ingredientes', 'carnes', 'peixes', 'frutas'],
        'viagem': ['turismo', 'destinos', 'aventura', 'praia', 'montanha', 'cidade', 'intercâmbio', 'mochilão', 'hostel', 'hotel', 'passagens', 'voos', 'bagagem', 'reserva', 'roteiro', 'câmbio', 'seguro viagem', 'cultura', 'passeios', 'guias'],
    };

    const handleInputChange = (event) => {
        setChave(event.target.value);
    };

    const handleSearchButtonClick = () => {
        if (data[chave]) {
          setValores(data[chave]);
        } else {
          alert('Chave não encontrada');
          setValores([]); // Limpa os valores exibidos
        }
      };

      return (
        <div className='wordcloud-section'>
            <h2>Digite uma palavra chave</h2>
            <div className='searchbox'>
        
                <input className='search-input'
                placeholder='ex javascript' value={chave}
                onChange={handleInputChange} type='text'/>
                <button className='btn-search'
                onClick={handleSearchButtonClick}>Pesquisar</button>
            </div>

            <div className='wordcloud-box'>
                <TagCloud 
                    minSize={6}
                    maxSize={35}
                    tags={valores.map((valor) => ({value: valor}))}
                />
            </div>
        </div>
    )
};


export default WordCloud;