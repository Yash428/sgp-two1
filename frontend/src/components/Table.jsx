import React from 'react'

function Table({children,headers,body,footer}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                    >
                                        <span>Student Id</span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                    >
                                        Name
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                    >
                                        Password
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                    >
                                        Strength
                                    </th>
                                    <th scope="col" className="relative px-4 py-3.5">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {studentData.map((student) => (
                                <tr key={student.student_id}>
                                    <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{student.student_id}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4">
                                    <div className="text-sm text-gray-900 ">{student.student_name}</div>
                                    </td>
                                    <td>
                                        <Input className='w-2/3' readOnly value={student.student_password} />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                    <span className={`inline-flex rounded-full ${passwordStrengthColor} px-2 text-xs font-semibold leading-5 text-green-800`}>
                                        {passwordStrength}
                                    </span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                    <a href="#" className="text-gray-700">
                                        Edit
                                    </a>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Table