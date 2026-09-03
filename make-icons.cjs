const sharp = require('sharp');
const src = 'public/logo-1.png';
Promise.all([
  sharp(src).resize(192,192,{fit:'contain',background:{r:10,g:5,b:2,alpha:1}}).png().toFile('public/icons/icon-192.png'),
  sharp(src).resize(512,512,{fit:'contain',background:{r:10,g:5,b:2,alpha:1}}).png().toFile('public/icons/icon-512.png'),
  sharp(src).resize(180,180,{fit:'contain',background:{r:10,g:5,b:2,alpha:1}}).png().toFile('public/icons/apple-touch-icon.png'),
]).then(()=>console.log('All icons generated!')).catch(e=>console.error(e));
