import fs from 'fs';


//  ****  1. Write file   ****

// ** this overwrites the data everytime

// fs.writeFileSync("test.txt", "Hello, This is mansi! \n");         

// ** to add the new data 
// fs.appendFileSync("test.txt", "I am learning about file reading and writing from ChaiCode, and i am using append method here!");


//to create a folder 
// fs.mkdirSync("myFolder");    

//to create nested add /newfolder if parent folder already exists
// fs.mkdirSync("myFolder/innerFolder");      //update in place

//to create nested folder at once
// fs.mkdirSync("mainFolder/innerFolder", {recursive: true});





//      ****** 2. Read file ******

// const data = fs.readFileSync("test.txt", "utf-8");
// console.log(data);


// ***** 3. Delete/Unlink file/folder *****

// fs.writeFileSync("toDelete.txt", "Will delete this file eventually!");

// fs.unlink("toDelete.txt", (err) => {
//     if(err) throw err;

//     console.log("File Deleted!");
// })


// fs.rm("myFolder", {recursive: true});

// fs.rm("mainFolder", {recursive: true});





// ***** 4. Rename a file ******

// fs.renameSync("test.txt", "test1.txt");

// fs.renameSync("test1.txt", "testRename.txt");
// console.log("Successfully renamed the file!");



// ****** 5. Copy a file ******

// fs.cpSync("testRename.txt", "copyTest.txt");
