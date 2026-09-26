const fs = require('fs');
const path = './fallbackData.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/"_id": "0"/g, '"_id": "python-data-science"');
content = content.replace(/"_id": "1"/g, '"_id": "machine-learning"');
content = content.replace(/"_id": "2"/g, '"_id": "deep-learning"');
content = content.replace(/"_id": "3"/g, '"_id": "generative-ai-roadmap"');
content = content.replace(/"_id": "4"/g, '"_id": "generative-ai-langchain"');
content = content.replace(/"_id": "5"/g, '"_id": "nlp"');

fs.writeFileSync(path, content, 'utf8');
console.log('Updated fallbackData.js IDs');
