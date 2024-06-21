import React,{useState} from 'react';
import './Audit.css'
import Engload from '../Loading/Loading';


//URL
const URLChaves = 'http://localhost:5000/api/words'



const AuditData = () => {
    const [loading, setLoading] = useState(false);
    const [keyList, setKeyList] = useState([])
    const [showTable, setShowTable] = useState(false);

    const handleClickGetKey = () => {
        setLoading(true);
        fetch(`${URLChaves}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possivel carregar as chaves')
                }
                return response.json()
            })
            .then(data => {
                console.log("reposta da api: ", data)
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


    return(
        <section className='audit-section'>
            <div className='box-audit'>
                <button onClick={handleClickGetKey} className='loadData'>Carregar dados</button>
                <button className='auditData'>Atualizar dados</button>                
            </div>
            
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
                                        <td><button>Deletar</button></td>
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