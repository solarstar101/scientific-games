export const rowGenerator = (data : any[],rownumber: number) => {
    const rows = [...Array( Math.ceil(data.length / rownumber) )];


    return rows.map((row, idx) =>(data.slice(idx * rownumber, idx * rownumber + rownumber) ))
}