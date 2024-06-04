import './WordCloud.css'

export default function WordCloud () {
    return (
        <div className='wordcloud-section'>
            <h2>Digite uma palavra chave</h2>
            <div className='searchbox'>
        
                <input className='search-input'/>
                <button className='btn-search'>Pesquisar</button>
            </div>
        </div>
    )
}