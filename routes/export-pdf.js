const express = require('express');

const router = express.Router();
const puppeteer = require('puppeteer');

let host;
switch (process.env.NODE_ENV) {
  case 'production':
    host = 'https://applicantmaps.planning.nyc.gov';
    break;
  case 'staging':
    host = 'https://applicantmaps-staging.planninglabs.nyc';
    break;
  default:
    host = 'http://localhost:4200';
}

async function generatePdf(id, format = 'Tabloid', landscape = true) {
  const url = `${host}/projects/${id}/edit/map/edit`;

  try {
    const browser = await puppeteer.launch({
      dumpio: true,
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({
      format,
      landscape,
    });

    return buffer;
  } catch (e) {
    throw (Error(e));
  }
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { orientation, size } = req.query;

  // map query params to format and landscape values for puppeteer
  const format = size === 'tabloid' ? 'Tabloid' : 'Letter';
  const landscape = (orientation === 'landscape');

  try {
    const body = await generatePdf(encodeURIComponent(id), format, landscape);
    res.setHeader('Content-type', 'application/pdf');
    res.send(body);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
