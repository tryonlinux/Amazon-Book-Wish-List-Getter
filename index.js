const puppeteer = require('puppeteer');
const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');
var args = process.argv.slice(2);

if ((args.length = 2)) {
  SaveWishListToCSV(args[0], args[1]);
} else {
  console.log('Not enough arguments!');
}

async function SaveWishListToCSV(url, fileName) {
  //Used the below args due to running WSL with linux on windows.
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process'
    ]
  });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tr'));

    return tds.slice(1).map(tr => {
      const tdNodeList = tr.querySelectorAll('td');
      const tdArray = Array.from(tdNodeList);
      const [image, titleAuthor, comment, price, quantity, has] = tdArray.map(
        td => td.innerText
      );
      //split out the title and author because they are stuck together in the same td element
      let title = titleAuthor.split('\nby')[0];
      let author = titleAuthor.split('\nby')[1];
      if (author) {
        author = author.split('|')[0];
      } else {
        author = 'Not Listed!';
      }
      return {
        // don't need this, it is blank anyways: image,
        title,
        author,
        comment,
        price,
        quantity,
        has
      };
    });
  });

  const header = ['Title', 'Author', 'Comment', 'Price', 'Quantity', 'Has'];
  const csvFromArrayOfArrays = convertArrayToCSV(data, {
    header
  });
  fs.writeFile(fileName, csvFromArrayOfArrays, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
  await browser.close();
}
