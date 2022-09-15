export const rowGenerator = (data : [],rownumber: number) => {
    const rows = [...Array( Math.ceil(data.length / rownumber) )];


    return rows.map((row, idx) =>(data.slice(idx * 5, idx * 5 + 5) ))
}