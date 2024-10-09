let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify( myLeads) )
        render(myLeads)
    })
})


function render(leads) {
    let listItems = ""
    for (let i =0; i < leads.length; i++) {
        //listItems+= "<li><a target='_blank'  href='" + myLeads[i]  + "'>" + myLeads[i] + "</a></li>"
        listItems+= `
        <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]} 
        </a>
        <i class="fas fa-trash-alt text-warning cursor-pointer delete-item" data-index="${i}"></i> 
        </li>
        `;
    }
    ulEl.innerHTML = listItems
    addDeleteListeners() //newline
}
 
//newline
function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-item")
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(button.getAttribute("data-index"))
            myLeads.splice(index,1)
            localStorage.setItem("myLeads",JSON.stringify(myLeads))
            render(myLeads)
        })
    })
}


deleteBtn.addEventListener("dblclick",function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})



    //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
    // create element
    // set text content
    // append to ul
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)


