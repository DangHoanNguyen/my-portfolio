
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
            this.cur = 0;
        },
        viewPortfolio: function() {
            this.cur = 1;            
        },
        viewContact: function() {
            this.cur = 2;
        },
        loadprojects: async function() {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () =>{
                if (req.status == 200 && req.readyState == 4) {
                    let result = req.responseText;
                    result = JSON.parse(result);
                    this.projects = result;
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
                    
                    this.description = result.split("\r\n"); 
                    let ctn = document.getElementById("main-content-projects");
                    //Remove all description elements from previuous project
                    document.querySelectorAll(".des").forEach(element => element.remove());
                    for(let i = 0; i < this.description.length; i++){
                        if(this.description[i] != "") {
                            let description = document.createElement("p");
                            description.className = "des";
                            description.innerText = this.description[i];
                            ctn.appendChild(description);
                        }
                    }

                    for (let i = 0; i < this.projects.length; i++){
                        if (this.projects[i]["id"] == pid) {
                            document.getElementById("project-name").innerText = this.projects[i]["name"];
                            this.cur_project_gitrepo = this.projects[i]["githubRepo"];
                            let parent = document.getElementById("gitrepo");
                            parent.innerText = "GitHub Repository: ";
                            let repo = document.createElement("A");
                            repo.innerText = this.cur_project_gitrepo;
                            repo.setAttribute("target", "_blank");
                            repo.setAttribute("href", this.cur_project_gitrepo);
                            parent.appendChild(repo);

                            //Include an image
                            let pic = document.getElementById("project-pic")
                            pic.setAttribute("src", this.projects[i]["image"]);
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
                    this.linkedin = result["linkedin"];
                    this.upwork = result["upwork"];
                    this.phoneNo = result["phoneNO"];
                    this.github = result["github"];
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
