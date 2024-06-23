import React, { Component } from 'react';
import './Audit.css';
import Engload from '../Loading/Loading';

// URL
const URLChaves = 'http://localhost:5000/api/words';

class AuditData extends Component {
    //Cria o constructor
    constructor(props) {
        super(props);
        this.state = {
            loading: false,//Estado para carregar
            keyList: [],//Estado para armazenar a lista de palavras
            showTable: false, // Estado para conrolar a tabela
            showAddModal: false, // Estado para controlar o modal de adicionar
            showEditModal: false, // Estado para controlar o modal de editar
            newWord: '', // Estado para capturar a nova palavra
            editWord: '', // Estado para capturar a palavra editada
            currentWord: '', // Estado para capturar a palavra atual sendo editada
        };
    }

    //Acessa a rota para pegar a lista de palavras
    handleClickGetKey = () => {
        this.setState({ loading: true });
        fetch(`${URLChaves}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível carregar as chaves');
                }
                return response.json();
            })
            .then(data => {
                //console.log("resposta da api: ", data);
                if (data.words_search && Array.isArray(data.words_search)) {
                    this.setState({ keyList: data.words_search, showTable: true });
                } else {
                    this.setState({ keyList: [], showTable: false });
                    alert('Nenhum resultado encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                alert('Ocorreu um erro ao buscar dados.', error);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    // Mostra o modal
    handleAddWord = () => {
        this.setState({ showAddModal: true });
    };

    //Acessa a rota para adicionar uma nova palavra 
    handleSaveWord = () => {
        const { newWord } = this.state;
        this.setState({ showAddModal: false, loading: true });

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
                /*console.log("Palavra adicionada: ", data);*/
                alert('Palavra adicionada com sucesso!', data)
                this.handleClickGetKey();
            })
            .catch(error => {
                console.error('Erro ao adicionar a palavra:', error);
                alert('Ocorreu um erro ao adicionar a palavra.', error);
            })
            .finally(() => {
                this.setState({ loading: false, newWord: '' }); // Limpar o campo de nova palavra
            });
    };

    //Acessa a rota para excluir uma palavra
    handleDeleteWord = (word) => {
        this.setState({ loading: true });

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
                alert('Palavra deletada com sucesso!')
                this.handleClickGetKey();
            })
            .catch(error => {
                console.error('Erro ao deletar a palavra:', error);
                alert('Ocorreu um erro ao deletar a palavra.', error);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    //Mostra o modal
    handleEditWord = (word) => {
        this.setState({ currentWord: word, editWord: word, showEditModal: true });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o top da pagina
    };

    //Acessa a rota para editar uma palavra
    handleSaveEditWord = () => {
        const { currentWord, editWord } = this.state;
        this.setState({ showEditModal: false, loading: true });
         

        fetch(`${URLChaves}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word_before: currentWord, word_after: editWord }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível editar a palavra');
                }
                return response.json();
            })
            .then(data => {
                //console.log("Palavra editada: ", data);
                alert('Palavra alterada com sucesso')
                this.handleClickGetKey();
            })
            .catch(error => {
                console.error('Erro ao editar a palavra:', error);
                alert('Ocorreu um erro ao editar a palavra.', error);
            })
            .finally(() => {
                this.setState({ loading: false, editWord: '', currentWord: '' }); // Limpar os campos de edição
            });
    };

    render() {
        
        const { loading, keyList, showTable, showAddModal, showEditModal, newWord, editWord } = this.state;

        return (
            <section className='audit-section'>
                <div className='box-audit'>
                    <div className='btn-box-audit'>
                        <button onClick={this.handleClickGetKey} className='loadData'>Carregar dados</button>
                        <button onClick={this.handleAddWord} className='addWord'>Adicionar Palavra</button>
                    </div>
                </div>
                {/*Mostra o modal para adicionar uma nova palavra*/}
                {showAddModal && (
                    <div className='modal'>
                        <h4>Adicionar Nova Palavra</h4>
                        <div className='modal-content'>
                            <input 
                                type='text' 
                                value={newWord} 
                                onChange={(e) => this.setState({ newWord: e.target.value })} 
                                placeholder='Digite a nova palavra' 
                            />
                            <button onClick={this.handleSaveWord}>Salvar</button>
                            <button onClick={() => this.setState({ showAddModal: false })}>Cancelar</button>
                        </div>
                    </div>
                )}

                {/*Mostra o modal para editar uma palavra*/}
                {showEditModal && (
                    <div className='modal'>
                        <h4>Editar Palavra</h4>
                        <div className='modal-content'>
                            <input 
                                type='text' 
                                value={editWord} 
                                onChange={(e) => this.setState({ editWord: e.target.value })} 
                                placeholder='Digite a nova palavra' 
                            />
                            <button onClick={this.handleSaveEditWord}>Salvar</button>
                            <button onClick={() => this.setState({ showEditModal: false })}>Cancelar</button>
                        </div>
                    </div>
                )}

                <div className='tableContent'>
                    {loading ? (
                        <Engload /> // Mostra o componente de loading enquanto os dados são carregados
                    ) : (
                        showTable && keyList.length > 0 ? (
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
                                            <td><button onClick={() => this.handleEditWord(item)}>Editar</button></td>
                                            <td><button onClick={() => this.handleDeleteWord(item)}>Deletar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>Nenhum dado encontrado.</div>
                        )
                    )}
                </div>
            </section>
        );
    }
}

export default AuditData;