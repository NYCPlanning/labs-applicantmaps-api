const express = require('express');

const router = express.Router();
const puppeteer = require('puppeteer');


async function generatePdf(id, format = 'Tabloid', landscape = true) {
  const url = `http://localhost:4200/projects/${id}/edit/map/edit`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const buffer = await page.pdf({
    format,
    landscape,
  });

  return buffer;
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { orientation, size } = req.query;

  // map query params to format and landscape values for puppeteer
  const format = size === 'tabloid' ? 'Tabloid' : 'Letter';
  const landscape = (orientation === 'landscape');

  const body = await generatePdf(encodeURIComponent(id), format, landscape);
  res.setHeader('Content-type', 'application/pdf');
  res.send(body);
});

module.exports = router;
