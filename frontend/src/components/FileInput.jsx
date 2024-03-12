import React from 'react'

function FileInput({
    onChange,
    value="",
    ...props
}) {
  return (
    <div>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" {...props} onChange={onChange} type="file"></input>
    </div>
  )
}

export default FileInput