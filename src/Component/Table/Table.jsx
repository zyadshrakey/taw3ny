import React from 'react'
import Loader from '../Loader/Loader'

function Table({columns, data,renderRow,isLoading,emptyMessage,dir = 'rtl',className = '', maxHeight = 'auto' }) {
    return <>
        <div style={{ maxHeight: maxHeight, overflowY: maxHeight !== 'auto' ? 'auto' : 'visible' }} className={className}>
            <table className={`table table-striped rounded-5 overflow-hidden`} dir={dir} style={{width: '100%'}}>
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
                            <Loader /> {/* Use the animated Loader component */}

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
        </div>
    </>
}

export default Table
