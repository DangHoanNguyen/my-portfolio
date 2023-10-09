let mydata = {
    projects: [],
    description: ["Choose a project for details."],
    cur_project: "",
    cur_project_gitrepo: "",
    github: "",
    upwork: "",
    phoneNo: "",
    linkedin: ""
}

const loadprojects = () => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.status == 200 && req.readyState == 4) {
            let result = req.responseText;
            result = JSON.parse(result);
            mydata.projects = result;
            rendermenu();
        }
    };
    req.open("GET", "/load_projects");
    req.send();
}

const loadverticalmenu = () => {
    let vertical_menu = [];

    for (let p of mydata.projects) {
        let elm = (
            <button type="button" class="nav-link project-badge col-12" value={p.id} onClick={loaddescription}>{p.name}</button>

        );
        vertical_menu.push(elm);
    }
    console.log(vertical_menu);
    return (
        <ul class="navbar-nav">
            {vertical_menu}
        </ul>
    );
}

const rendermenu = () => {
    let elm = loadverticalmenu();
    const menu = ReactDOM.createRoot(document.getElementById('vertmenuctn'));
    menu.render(elm);
}

const loaddescription = (event) => {
    try {
        var pid = event.target.value;
    }
    catch(err) {
        console.log(err);
        return;
    }
    let url = "/load_description?id=" + pid;
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.status == 200 && req.readyState == 4) {
            let result = req.responseText;
            result = JSON.parse(result);
            document.getElementById("temp").style.visibility = "hidden";

            mydata.description = result.split("\r\n");
            let x = renderdes(mydata.description);
            ctn.render(x);
            let image = document.getElementById("project-pic");
            image.setAttribute('src', mydata.projects[pid-1]['image']);
            image.style.setProperty('display', 'block');
        }
    };
    req.open("GET", url);
    req.send();
}

const renderdes = (paras) => {
    let des = [];
    for (let p of paras) {
        des.push(<p>{p}</p>);
    }
    return (
        <ul>
            {des}
        </ul>
    );
}


let ctn = ReactDOM.createRoot(document.getElementById('description'));
let img = ReactDOM.createRoot(document.getElementById('project-pic'));

const initialize = () => {
    loadprojects();
}


initialize();