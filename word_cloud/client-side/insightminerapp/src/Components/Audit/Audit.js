import React,{useState} from 'react';
import './Audit.css'
import Engload from '../Loading/Loading';


//URL
const URLChaves = 'http://localhost:5000/api/words'



const AuditData = () => {
    const [loading, setLoading] = useState(false);//Estado para controlar o carregamento
    const [keyList, setKeyList] = useState([]);// Estado para guarda o array de palavras
    const [showTable, setShowTable] = useState(false);// Estado para controlar a visualização da tabela
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [newWord, setNewWord] = useState('');// Estado para capturar a nova palavra

    //Faz a rota para pegar o array de palavras
    const handleGetKey = () => {
        setLoading(true);
        fetch(`${URLChaves}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possivel carregar as chaves')
                }
                return response.json()
            })
            .then(data => {
                //console.log("reposta da api: ", data)
                if (data.words_search && Array.isArray(data.words_search)) {
                    setKeyList(data.words_search);
                    setShowTable(true);
                } else {
                    setKeyList([]); // Limpa os valores exibidos
                    setShowTable(false);
                    alert('Nenhum resultado encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                alert('Ocorreu um erro ao buscar dados.', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    //Abrir o modal quando o botão fir clicado
    const handleAddWord = () => {
        setShowModal(true);
    };

    //Faz a rota para salvar a nova palavra
    const handleSaveWord = () => {
        // Fechar o modal
        setShowModal(false);
        setLoading(true);

        // Fazer a requisição para adicionar a nova palavra
        fetch(`${URLChaves}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word_to_add: newWord }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível adicionar a palavra');
                }
                return response.json();
            })
            .then(data => {
                //console.log("Palavra adicionada: ", data);
                alert('Palavra adicionada com sucesso!', data)
                // Atualizar a lista de palavras
                handleGetKey();
            })
            .catch(error => {
                console.error('Erro ao adicionar a palavra:', error);
                alert('Ocorreu um erro ao adicionar a palavra.', error);
            })
            .finally(() => {
                setLoading(false);
                setNewWord(''); // Limpar o campo de nova palavra
            });
    };

    //Faz a rota para deletar uma palavra
    const handleDeleteWord = (word) => {
        setLoading(true);

        fetch(`${URLChaves}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word_to_remove: word }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível deletar a palavra');
                }
                return response.json();
            })
            .then(data => {
                //console.log("Palavra deletada: ", data);
                alert('Palavra deletada com sucesso!', data)
                //Atualiza a lista de palavras
                handleGetKey();
            })
            .catch(error => {
                console.error('Erro ao deletar a palavra:', error);
                alert('Ocorreu um erro ao deletar a palavra.', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };



    return(
        <section className='audit-section'>
            <div className='box-audit'>
                <button onClick={handleGetKey} className='loadData'>Carregar dados</button>
                <button onClick={handleAddWord} className='addWord'>Adicionar palavra</button>                
            </div>
            
            {showModal && (
                <div className='newWord'>
                    <h4>Adicione uma palavra chave</h4>
                    <div className='newWord-content'>
                        <input 
                            type='text' 
                            value={newWord} 
                            onChange={(e) => setNewWord(e.target.value)} 
                            placeholder='Digite a nova palavra' 
                        />
                        <button onClick={handleSaveWord}>Salvar</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div className='tableContent'>
            {loading ? (
                    <Engload /> // Mostra o componente de loading enquanto os dados são carregados
                ) : (
                    showTable && keyList.length > 0 ? ( // Verifica se deve mostrar a tabela
                        <table>
                            <thead>
                                <tr>
                                    <th>index</th>
                                    <th>Chave</th>
                                    <th>Editar</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keyList.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item}</td>
                                        <td><button>Editar</button></td>
                                        <td><button onClick={() => handleDeleteWord(item)}>Deletar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )
                )}
            </div>
        </section>
    )
};

export default AuditData;