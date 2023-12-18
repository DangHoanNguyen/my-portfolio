
const home = new Vue({
    el: "#outer",
    data: {
        cur: 0,
        bio: [],
        projects: [],
        description: ["Choose a project for details."],
        cur_project: "",
        cur_project_gitrepo: "",
        github: "",
        upwork: "",
        phoneNo: "",
        linkedin: ""
    },
    methods: {
        viewProfile: function() {
            home.cur = 0;
        },
        viewPortfolio: function() {
            home.cur = 1;            
        },
        viewContact: function() {
            home.cur = 2;
        },
        loadprojects: async function() {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () =>{
                if (req.status == 200 && req.readyState == 4) {
                    let result = req.responseText;
                    result = JSON.parse(result);
                    home.projects = result;
                }
            };
            req.open("GET", "/load_projects");
            req.send();
        },
        loaddescription: async function(event) {
            let pid = event.target.value;
            let url = "/load_description?id=" + pid;
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.status == 200 && req.readyState == 4) {
                    let result = req.responseText;
                    result = JSON.parse(result);
                    document.getElementById("temp").style.visibility = "hidden";
                    
                    home.description = result.split("\r\n"); 
                    let ctn = document.getElementById("main-content-projects");
                    //Remove all description elements from previuous project
                    document.querySelectorAll(".des").forEach(element => element.remove());
                    for(let i = 0; i < home.description.length; i++){
                        if(home.description[i] != "") {
                            let description = document.createElement("p");
                            description.className = "des";
                            description.innerText = home.description[i];
                            ctn.appendChild(description);
                        }
                    }

                    for (let i = 0; i < home.projects.length; i++){
                        if (home.projects[i]["id"] == pid) {
                            document.getElementById("project-name").innerText = home.projects[i]["name"];
                            home.cur_project_gitrepo = home.projects[i]["githubrepo"];
                            home.cur_project_url = home.projects[i]["url"];

                            let parent = document.getElementById("gitrepo");
                            parent.innerText = "GitHub Repository: ";
                            let repo = document.createElement("A");
                            repo.innerText = home.cur_project_gitrepo;
                            repo.setAttribute("target", "_blank");
                            repo.setAttribute("href", home.cur_project_gitrepo);
                            parent.appendChild(repo);

                            let weburl = document.getElementById("weburl");
                            weburl.innerText = "View website: ";
                            let link_to_page = document.createElement("A");
                            link_to_page.innerText = home.cur_project_url;
                            link_to_page.setAttribute("target", "_blank");
                            link_to_page.setAttribute("href", home.cur_project_url);
                            weburl.appendChild(link_to_page);

                            //Include an image
                            let pic = document.getElementById("project-pic")
                            pic.setAttribute("src", home.projects[i]["image"]);
                            pic.style.display = "block";
                            break;
                        }
                    }

                   
                }
            };
            req.open("GET", url);
            req.send();
        },
        loadcontact: function() {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.status == 200 && req.readyState == 4) {
                    let result = req.responseText;
                    result = JSON.parse(result);
                    result = result[0];
                    home.linkedin = result["linkedin"];
                    home.upwork = result["upwork"];
                    home.phoneNo = result["phoneNO"];
                    home.github = result["github"];
                }
            }
            req.open("GET", "/load_contact");
            req.send();

    }
    }
});

let initialize = () => {
    home.loadprojects();
    home.loadcontact();
}

initialize();
