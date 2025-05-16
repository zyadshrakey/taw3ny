import React from 'react'

function Table({columns, data,renderRow,isLoading,emptyMessage,dir = 'rtl',className = '' }) {
    return <>
        <table className={`table table-striped rounded-5 overflow-hidden ${className}`} dir={dir}>
            <thead >
                <tr> 
                {columns.map((col, i) => (
                    <th key={i} className='py-3 text-white' style={{ backgroundColor: '#214D97	' }}>{col}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            <div className="py-3">Loading...</div>
                        </td>
                    </tr>
                    ) : data.length > 0 ? (
                    data.map(renderRow)
                    ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center text-danger py-3">
                        <h3>{emptyMessage || 'لا يوجد بيانات'}</h3>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}

export default Table
