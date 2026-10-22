import fs from 'fs';
import path from 'path';

const orderFilePath = path.join('src', 'routes', 'team', 'order.json');
let orderData;

try {
  orderData = JSON.parse(fs.readFileSync(orderFilePath, 'utf-8'));
} catch (error) {
  console.error(`Error reading order.json: ${error.message}`);
  orderData = {};  // Handle as empty object or suitable default
}

const mdFiles = fs.readdirSync(path.join('src', 'routes', 'team')).filter(file => file.endsWith('.md'));
const mdFileNames = mdFiles.map(file => file.replace('.md', ''));

const orderEntries = Object.keys(orderData);

orderEntries.forEach(entry => {
  if (!mdFileNames.includes(entry)) {
    console.error(`Error: Entry "${entry}" in order.json has no corresponding Markdown file.`);
  }
});

mdFileNames.forEach(fileName => {
  if (!orderEntries.includes(fileName)) {
    console.error(`Error: Markdown file "${fileName}.md" is not listed in order.json.`);
  }
});
