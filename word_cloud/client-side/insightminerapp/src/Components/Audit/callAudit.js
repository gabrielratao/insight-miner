import React, { useState } from "react";
import AuditData from "./Audit";

// CRIAR UM NOVO COMP QUE VAI CHAMAR WORDCLOUD E AUDITDATA
// ESSA COMP VAI SER TIPO UM NAVBAR EMBAIXO DO HEADER
//NELE O USUARIO VAI PODER TROCAR ENTRE OS DOIS COMPONENTES :)
export default function AuditButton () {
    const [showAuditData, setShowAuditData] = useState(false);

    const handleclick = () => {
        setShowAuditData(true);
    }

    return (
        <div>
            <button onClick={handleclick}> Audit Data</button>
        
        </div>
    )
}