console.log("Hello");

document.getElementById('searchIcon').addEventListener('click', serachTable);
const results = document.getElementById("searchResults");
console.log(results);

function serachTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();  
    const rows = document.getElementsByTagName("tr");
    let count = 0;
    for (let i = 0; i < rows.length; i++) {
      const rowText = rows[i].textContent.toLowerCase();

      if (rowText.includes(input)) {
          rows[i].classList.add("highlight");
          count++;
      } else {
        rows[i].classList.remove("highlight");
      }
    }
    console.log(count + ' out of ' + rows.length + " results found.");
    results.textContent = count + " out of " + rows.length + " results found.";
}



