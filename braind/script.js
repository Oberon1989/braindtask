function show()
{
    let upload =document.getElementById("upload").files[0];
   let reader = new FileReader();
    exelToJson1(upload);
}

function exelToJson1(file)
{

            let reader = new FileReader();
            reader.readAsBinaryString(file);
            let result=null;
            reader.onload = function(e) {
                let data = e.target.result;
               let workbook = XLSX.read(data, {
                    type: 'binary'
                });

                workbook.SheetNames.forEach(function(sheetName) {
                    // Here is your object
                   let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    let json_object = JSON.stringify(XL_row_object);
                    //console.log(json_object);
                   generateTable(JSON.parse(json_object));

                })

            };

            reader.onerror = function(ex) {
                console.log(ex);
            };


}

function generateTable(jsonObject)
{
    let table ="<table border='1px'>";
    table+="<tr>";
    Object.entries(jsonObject[1]).forEach(([key, value]) => {
        table+="<td>"+key+"</td>"
    });
    table+="</tr>"
    console.log(table)

    for (let i = 1; i < jsonObject.length; i++) {
            table+=i%2==0?"<tr style='background-color: darkgray'>":"<tr>"
            if(i==jsonObject.length-1)
            {
                table+=addEmptyCellRow(2);
            }
            Object.entries(jsonObject[i]).forEach(([key, value]) => {
                let number = parseFloat(value);
                if(!isNaN(number))
                {
                    let color = number>0?"green":"red";
                    table+="<td style='color: "+color+"'>"+value+"</td>"
                }
                else
                {
                    table+="<td>"+value+"</td>"
                }
            });
            table+="</tr>";
        }



    table+="</table>";
    document.body.insertAdjacentHTML("beforeend", table);
}

function addEmptyCellRow(count)
{
    let result="";
    for (let i = 0; i < count; i++) {
        result+="<td></td>";
    }
    return result;
}

function getSize(jsonObject)
{
    let size =0;
    Object.entries(jsonObject).forEach(([key, value]) =>{size++});
    return size;
}