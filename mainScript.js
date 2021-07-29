function mainRequest() {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.coincap.io/v2/assets/");
    xhttp.send();
  
    xhttp.onload = function () {
      let html = ``;
      let data = JSON.parse(this.responseText);
      console.log(typeof data);
      for (let i = 0; i < 100; i++) {
        let json = data.data[i]
        let nam = json.name
        let rank = json.rank
        let price = Number(json.priceUsd).toFixed(4)
        let changedLast = Number(json.changePercent24Hr).toFixed(3)
        let isChange = ''
        if (changedLast < 0) {
          isChange = `<span class="material-icons" style="color:red" >trending_down</span>`
        }
        else {
          isChange = `<span class="material-icons" style="color:greenyellow" >trending_up</span>`
        }
        html += `
        <tr>
        <th scope="row">${rank}</th>
        <td>${nam}</td>
        <td>$${price}</td>
        <td>${changedLast}% ${isChange}</td>
      </tr>
      <br>`
      }
      document.getElementById("bitBody").innerHTML = html;
      document.getElementById('btn-change').innerText = "Click to get rank according to Current Price"
      document.getElementById('abt-txt').innerText = "Here is the table below of Cryptocurrencies arranged according to Current Trends ."
      document.getElementById("btn-change").onclick = rankPrice
    }
  }
  
  
  
  function rankPrice() {
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.coincap.io/v2/assets/");
    xhttp.send();
  
    xhttp.onload = function () {
      let html = ``;
      let data = JSON.parse(this.responseText);
      console.log(typeof data);
      let arr = data.data
      arr.sort(function (a, b) {
        return a.priceUsd - b.priceUsd;
      });
      arr.reverse()
      let i = 1
      let html2 = ""
      arr.forEach(element => {
        let nam = element['name']
        let rank = i
        let price = Number(element.priceUsd).toFixed(4)
        let changedLast = Number(element.changePercent24Hr).toFixed(3)
        let isChange = ''
        if (changedLast < 0) {
          isChange = `<span class="material-icons" style="color:red" >trending_down</span>`
        }
        else {
          isChange = `<span class="material-icons" style="color:greenyellow" >trending_up</span>`
        }
        i += 1
        html2 += `
        <tr>
        <th scope="row">${rank}</th>
        <td>${nam}</td>
        <td>$${price}</td>
        <td>${changedLast}% ${isChange}</td>
      </tr>
      <br>`
      })
  
      document.getElementById("bitBody").innerHTML = html2
      document.getElementById('btn-change').innerText = "Click to get rank according to Current Trends"
      document.getElementById('abt-txt').innerText = "Here is the table below of Cryptocurrencies arranged according to Current Prices ."
  
      document.getElementById("btn-change").onclick = mainRequest
    }
  }
  
  function searchCoin() {
    toSearch = document.getElementById("searchForm").value;
    console.log(toSearch)
    console.log(location.href.includes('index.html'))
    if (!(location.href.includes("index.html"))) {
      window.location.replace("index.html");
      console.log("redirected")
    }
    if (window.find(toSearch)) {
  
      console.log(toSearch)
      window.find(toSearch)
    }
  
    else {
      let modal = document.getElementById("Modal1");
      modal.style.display = "block";
    }
  
  }
  
  function closeModal() {
    let modal = document.getElementById("Modal1");
    modal.style.display = "none";
  }
  function copy(str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
    let bt = document.getElementById('copy-btn')
    bt.innerHTML = "Copied !"
    setTimeout(function () {
      document.getElementById('copy-btn').innerHTML = "Click to copy mail"
    }, 2000)
  }