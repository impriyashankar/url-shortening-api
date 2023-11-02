

document.querySelector('#form-shorten').addEventListener('submit', (event) => {

  const link = document.querySelector('#input-url').value;
  const errorMsg = document.querySelector('#main span');
  event.preventDefault();
  document.querySelector('#input-url').style.border = "none";

  if (link.length === 0) {
    errorMsg.classList.remove('hidden');
    document.querySelector('#input-url').style.border = "2px solid red";
  }
  else {

    // const url = `https://api.shrtco.de/v2/shorten?url=${link}`;

    const apiKey = "91df9b46bf1d41d3a884d68b2b3ddbd7";
    const headers = { Accept: "application/json", "Content-Type": "application/json", apikey: apiKey }
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({destination: link})
  };
    errorMsg.classList.add('hidden');

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => displayShortlink(link, data.result.short_link));

    fetch("https://api.rebrandly.com/v1/links", requestOptions)
    .then((response) => response.json())
    .then((data) => displayShortlink(link, data.shortUrl))
    .catch(error => console.log('error', error));
  }

});

const displayShortlink = (link, shortLink) => {
  const outerDiv = document.querySelector('#container-output');
  const newDiv = document.createElement('div');

  newDiv.className = "result";
  newDiv.innerHTML =
    ` <p>${link}</p>
    <hr>
    <a href="${shortLink}">${shortLink}</a>
    <button class = "btn-copy">Copy</button>`;
  outerDiv.appendChild(newDiv);

  const copyBtn = document.querySelectorAll('.btn-copy');

  copyBtn.forEach((item) => {
    item.addEventListener('click', (event) => {
      const urlSelect = event.currentTarget.closest('div.result').querySelector('a').innerText;
      console.log(urlSelect);
      navigator.clipboard.writeText(urlSelect);

      item.innerText = "Copied!";
      item.style.backgroundColor = 'hsl(260, 8%, 14%)';

    });
  });

}

document.querySelector('.menu.visible-xs').addEventListener("click", () => {
  document.querySelector('.menu-expanded-mob').classList.toggle('hidden');
});

// const copyUrl = document.querySelectorAll('.btn-copy');


// document.querySelector('.menu.visible-xs').addEventListener("click", () => {
//   document.querySelector('.menu-expanded-mob').classList.toggle('hidden');
// });
