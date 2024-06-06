import './Audit.css'
import React from "react";

export default function AuditData () {
    return(
        <section className='audit-section'>
            <div className='btn-box-audit'>
                <button className='loadData'>Carregar dados</button>
                <button className='auditData'>Auditar dados</button>
            </div>
            <div className='tableContent'>
                <table>
                    <thead>
                        <tr>
                            <th>Dado</th>
                            <th>Dado</th>
                            <th>editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>coisarada</td>
                            <td>coisarada</td>
                            <td>editar</td>
                        </tr>
                        <tr>
                            <td>coisarada</td>
                            <td>coisarada</td>
                            <td>editar</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}