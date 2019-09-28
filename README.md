# Amazon Book Wish List Getter

A quick and dirty node.js app that accesses a wish list from amazon that is in the print view and outputs a CSV file you can then open in Excel or Google Docs. There is probably something like this out there already, just wanted to build it myself and have fun using puppeteer. The CSV file includes Title, Author, Comments, Price, Quantity, and Has values. Could totally enhance this for any wish list, however I was just interested in books.

## Getting Started

To run simply clone and download code.

Then run the below line to install required packages.

`npm i`

Then execute the program with the URL to the print view of your book only wish list and the filename you would like to use.

`node index.js "amazon.com/samplewishlisturl" "filename for csv.csv"`

## Example

Below is an example using my book wishlist

```
node index.js "https://www.amazon.com/hz/wishlist/printview/19N0C4I9PXTNO" "mybooks.csv"
```

## Built With

- [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Web Page Automation to gather/pick out data
- [convert-array-to-csv](https://github.com/aichbauer/node-convert-array-to-csv#readme) - To convert the array of books to a CSV file
- [Node.JS](https://nodejs.org/en/) - Runtime for code

## Authors

Jordan Tryon

## License

This project is licensed under the MIT License - see the [LICENSE.md](License.md) file for details
