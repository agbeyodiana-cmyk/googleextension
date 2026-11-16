let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

try {
    const stored = JSON.parse(localStorage.getItem("myLeads") || "[]")
    if (Array.isArray(stored)) myLeads = stored
} catch (error) {
    myLeads = []
}

function save() {
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
}

function render(leads) {
    ulEl.replaceChildren()
    for (const lead of leads) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.href = lead
        a.target = "_blank"
        a.rel = "noopener noreferrer"
        // Show www. instead of the protocol; keep the actual link unchanged.
        const displayUrl = lead.replace(/^https?:\/\//i, "")
        a.textContent = displayUrl
        li.appendChild(a)
        ulEl.appendChild(li)
    }
}

inputBtn.addEventListener("click", function() {
    const value = inputEl.value.trim()
    if (!value) return
    let url
    try {
        url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    } catch (error) {
        alert("Please enter a valid website link.")
        return
    }
    if (!['http:', 'https:'].includes(url.protocol)) {
        alert("Please enter a valid website link.")
        return
    }
    myLeads.push(url.href)
    inputEl.value = ""
    save()
})

tabBtn.addEventListener("click", function() {
    // On a normal website, browsers only allow access to this page's URL.
    myLeads.push(window.location.href)
    save()
})

deleteBtn.addEventListener("click", function() {
    myLeads = []
    save()
})

render(myLeads)
