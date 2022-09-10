

document.querySelector('#form-shorten').addEventListener('submit', (event) => {

  const link = document.querySelector('#input-url').value;
  const errorMsg = document.querySelector('#main span');
  event.preventDefault();

  if (link.length === 0) {
    console.log("right");
    errorMsg.classList.remove('hidden');
    document.querySelector('#input-url').style.border = "2px solid red";
  }
  else {

    const url = `https://api.shrtco.de/v2/shorten?url=${link}`;

    errorMsg.classList.add('hidden');


    fetch(url)
      .then((response) => response.json())
      .then((data) => displayShortlink(link, data.result.short_link));
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
    item.addEventListener('click', () => {
      item.innerText = "Copied!";
      item.style.backgroundColor = 'hsl(260, 8%, 14%)';
    });
  });

}

document.querySelector('.menu.visible-xs').addEventListener("click", () => {
  document.querySelector('.menu-expanded-mob').classList.toggle('hidden');
});
