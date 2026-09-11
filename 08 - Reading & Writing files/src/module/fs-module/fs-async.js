import fs from "fs";

// fs.writeFile("testAsync.txt", "Abb async methods ke bare me sikhenge!", (err) => {
//     if(err) {
//         console.log(err);
//     }

//     console.log("File Written successfully!");
// });

fs.readFile("testAsync.txt", "utf-8",  (err, data) => {
    if(err) {
        console.log(err);
    } 

    console.log("Read: ", data);
})