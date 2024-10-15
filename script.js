//set varibles
let input=document.querySelector(".repos-container input");
let getbutton=document.querySelector(".get-button");
let dataRepo=document.querySelector(".show-data");
getbutton.onclick=()=>{
   getData();
}
function getData(){
    if(input.value===""){
        let span=document.createElement("span");
        span.appendChild(document.createTextNode("This Field Should not be Empty"));
        dataRepo.appendChild(span);
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response)=> response.json())
        .then((repos)=>{
            dataRepo.innerHtml="";
            repos.forEach((repo)=>{
                //create repo div
                let repoDiv=document.createElement("div");
                repoDiv.className="repo-box";
                //append repo name
                let repoName=document.createElement("span");
                repoName.appendChild(document.createTextNode(repo.name));
                repoDiv.appendChild(repoName);
                //append repo link
                let controls=document.createElement("div");
                controls.className="controls";
                let repoLink=document.createElement("a");
                repoLink.appendChild(document.createTextNode("visit"));
                repoLink.href=`https://github.com/${input.value}/${repo.name}`;
                repoLink.setAttribute("target","_blank");
                controls.appendChild(repoLink);
                //starts count
                let starsCount=document.createElement("span");
                starsCount.appendChild(document.createTextNode(`Stars ${repo.stargazers_count}`));
                controls.appendChild(starsCount);
                repoDiv.appendChild(controls);
                dataRepo.appendChild(repoDiv);
            })
        });

    }
}